import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Shared mouse state
const mouseState = {
  x: 0,
  y: 0,
  ndcX: 0,
  ndcY: 0,
  isIdle: false,
  idleTimer: null as number | null,
  idleStrength: 0,
  idleDuration: 0, // how long idle in seconds after pull starts
  autoRevert: false, // triggers auto-revert after max pull
  isScrolling: false,
  scrollTimer: null as number | null,
};

const IDLE_PULL_DELAY = 1.0; // delay in seconds before blackhole pull starts
const MAX_PULL_DURATION = 2.5; // seconds of ramp before auto-revert
const REVERT_COOLDOWN = 2.0; // seconds to stay reverted before allowing next pull
let revertCooldownTimer = 0;

function MouseTracker() {
  const { camera } = useThree();

  const resetIdle = () => {
    mouseState.isIdle = false;
    mouseState.idleDuration = 0;
    mouseState.autoRevert = false;
    if (mouseState.idleTimer) {
      clearTimeout(mouseState.idleTimer);
      mouseState.idleTimer = null;
    }
  };

  const scheduleIdle = () => {
    if (mouseState.idleTimer) clearTimeout(mouseState.idleTimer);
    mouseState.idleTimer = window.setTimeout(() => {
      mouseState.isIdle = true;
      mouseState.idleDuration = 0;
      mouseState.idleTimer = null;
    }, IDLE_PULL_DELAY * 1000);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseState.x = e.clientX;
      mouseState.y = e.clientY;
      mouseState.ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      resetIdle();
      scheduleIdle();
      revertCooldownTimer = 0;
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseState.x = t.clientX;
      mouseState.y = t.clientY;
      mouseState.ndcX = (t.clientX / window.innerWidth) * 2 - 1;
      mouseState.ndcY = -(t.clientY / window.innerHeight) * 2 + 1;
      resetIdle();
      scheduleIdle();
      revertCooldownTimer = 0;
    };

    const onTouchEnd = () => {
      resetIdle();
    };

    const onScroll = () => {
      mouseState.isScrolling = true;
      resetIdle();
      if (mouseState.scrollTimer) clearTimeout(mouseState.scrollTimer);
      mouseState.scrollTimer = window.setTimeout(() => {
        mouseState.isScrolling = false;
      }, 300);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      if (mouseState.idleTimer) clearTimeout(mouseState.idleTimer);
      if (mouseState.scrollTimer) clearTimeout(mouseState.scrollTimer);
    };
  }, []);

  useFrame((_, delta) => {
    // Track how long cursor has been stationary on the current point
    if (mouseState.isIdle && !mouseState.autoRevert) {
      mouseState.idleDuration += delta;
      if (mouseState.idleDuration >= MAX_PULL_DURATION) {
        mouseState.autoRevert = true;
        revertCooldownTimer = REVERT_COOLDOWN;
      }
    }

    // During auto-revert cooldown, count down
    if (mouseState.autoRevert) {
      revertCooldownTimer -= delta;
      if (revertCooldownTimer <= 0) {
        mouseState.autoRevert = false;
        mouseState.idleDuration = 0;
        mouseState.isIdle = false;
        if (!mouseState.isScrolling) {
          scheduleIdle();
        }
      }
    }

    // Exponential ramp: strength grows slowly at first then accelerates with hold duration.
    // t=0 → 0, t=MAX_PULL_DURATION → 1. Engages after 2 seconds of stationary cursor.
    let target = 0;
    if (mouseState.isIdle && !mouseState.autoRevert) {
      const t = Math.min(mouseState.idleDuration / MAX_PULL_DURATION, 1);
      const expo = (Math.exp(t * 4.5) - 1) / (Math.exp(4.5) - 1);
      target = Math.min(expo, 1);
    }
    // Snap up instantly when target grows; ease down when releasing
    if (target > mouseState.idleStrength) {
      mouseState.idleStrength = target;
    } else {
      mouseState.idleStrength += (target - mouseState.idleStrength) * Math.min(delta * 4, 1);
    }
  });

  return null;
}

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 6000;

  const { positions, originals } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return { positions: pos, originals: orig };
  }, []);

  const blackholePos = useMemo(() => new THREE.Vector3(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth rotation
    const frameDelta = Math.min(delta, 0.016); // Cap at 60fps equivalent
    ref.current.rotation.y += frameDelta * 0.02;
    ref.current.rotation.x += frameDelta * 0.005;

    const strength = mouseState.idleStrength;
    const worldTarget = new THREE.Vector3(mouseState.ndcX, mouseState.ndcY, 0.5).unproject(state.camera);
    const localTarget = ref.current.worldToLocal(worldTarget.clone());
    blackholePos.copy(localTarget);

    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    
    // Smoother restore with easing
    const restoreSpeed = mouseState.autoRevert ? 2.0 : 2.5;
    const smoothDelta = Math.min(frameDelta * restoreSpeed, 1);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      if (strength > 0.01) {
        tempVec.set(arr[ix], arr[iy], arr[iz]);
        const dir = blackholePos.clone().sub(tempVec);
        const dist = dir.length();
        
        if (dist > 0.02) {
          const effective = Math.pow(strength, 1.6) * 1.1;
          const pullForce = (effective * frameDelta * 6.2) / (dist * 0.5 + 0.2);
          dir.normalize().multiplyScalar(pullForce);
          arr[ix] += dir.x;
          arr[iy] += dir.y;
          arr[iz] += dir.z;
        } else {
          // Pull particles directly to singularity
          arr[ix] = blackholePos.x;
          arr[iy] = blackholePos.y;
          arr[iz] = blackholePos.z;
        }
      } else {
        // Smooth restore using interpolation
        arr[ix] += (originals[ix] - arr[ix]) * smoothDelta;
        arr[iy] += (originals[iy] - arr[iy]) * smoothDelta;
        arr[iz] += (originals[iz] - arr[iz]) * smoothDelta;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2dd4a8"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Nebula() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const { positions, originals } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const arm = Math.floor(Math.random() * 3);
      const angle = (arm * Math.PI * 2) / 3 + Math.random() * 2;
      const dist = 0.5 + Math.random() * 2.5;
      const spread = (Math.random() - 0.5) * 0.5;
      const x = Math.cos(angle) * dist + spread;
      const y = (Math.random() - 0.5) * 0.3;
      const z = Math.sin(angle) * dist + spread;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return { positions: pos, originals: orig };
  }, []);

  const blackholePos = useMemo(() => new THREE.Vector3(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth rotation
    const frameDelta = Math.min(delta, 0.016); // Cap at 60fps equivalent
    ref.current.rotation.y += frameDelta * 0.03;

    const strength = mouseState.idleStrength;
    const worldTarget = new THREE.Vector3(mouseState.ndcX, mouseState.ndcY, 0.5).unproject(state.camera);
    const localTarget = ref.current.worldToLocal(worldTarget.clone());
    blackholePos.copy(localTarget);

    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    
    // Smoother restore with easing
    const restoreSpeed = mouseState.autoRevert ? 2.0 : 2.5;
    const smoothDelta = Math.min(frameDelta * restoreSpeed, 1);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      if (strength > 0.01) {
        tempVec.set(arr[ix], arr[iy], arr[iz]);
        const dir = blackholePos.clone().sub(tempVec);
        const dist = dir.length();
        
        if (dist > 0.02) {
          const effective = Math.pow(strength, 1.6) * 1.2;
          const pullForce = (effective * frameDelta * 7.2) / (dist * 0.4 + 0.2);
          dir.normalize().multiplyScalar(pullForce);
          arr[ix] += dir.x;
          arr[iy] += dir.y;
          arr[iz] += dir.z;
        } else {
          // Pull particles directly to singularity
          arr[ix] = blackholePos.x;
          arr[iy] = blackholePos.y;
          arr[iz] = blackholePos.z;
        }
      } else {
        // Smooth restore using interpolation
        arr[ix] += (originals[ix] - arr[ix]) * smoothDelta;
        arr[iy] += (originals[iy] - arr[iy]) * smoothDelta;
        arr[iz] += (originals[iz] - arr[iz]) * smoothDelta;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#73ffb8"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}
const GalaxyBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <MouseTracker />
        <StarField />
        <Nebula />
      </Canvas>
    </div>
  );
};

export default GalaxyBackground;