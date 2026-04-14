import { useRef, useMemo, useEffect, useCallback } from "react";
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
  idleTimer: null as ReturnType<typeof setTimeout> | null,
  idleStrength: 0, // 0 = moving, ramps to 1 when idle
};

function MouseTracker() {
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseState.x = e.clientX;
      mouseState.y = e.clientY;
      mouseState.ndcX = (e.clientX / size.width) * 2 - 1;
      mouseState.ndcY = -(e.clientY / size.height) * 2 + 1;
      mouseState.isIdle = false;
      if (mouseState.idleTimer) clearTimeout(mouseState.idleTimer);
      mouseState.idleTimer = setTimeout(() => {
        mouseState.isIdle = true;
      }, 800);
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseState.x = t.clientX;
      mouseState.y = t.clientY;
      mouseState.ndcX = (t.clientX / size.width) * 2 - 1;
      mouseState.ndcY = -(t.clientY / size.height) * 2 + 1;
      mouseState.isIdle = false;
      if (mouseState.idleTimer) clearTimeout(mouseState.idleTimer);
      mouseState.idleTimer = setTimeout(() => {
        mouseState.isIdle = true;
      }, 800);
    };

    const onTouchEnd = () => {
      mouseState.isIdle = true;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      if (mouseState.idleTimer) clearTimeout(mouseState.idleTimer);
    };
  }, [size]);

  useFrame((_, delta) => {
    const target = mouseState.isIdle ? 1 : 0;
    mouseState.idleStrength += (target - mouseState.idleStrength) * Math.min(delta * 2, 1);
  });

  return null;
}

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 6000;

  // Store original positions for reset
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
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.005;

    const strength = mouseState.idleStrength;
    // Project mouse NDC to 3D world position at z=0
    blackholePos.set(mouseState.ndcX * 3, mouseState.ndcY * 2, 0);

    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      if (strength > 0.01) {
        // Pull toward black hole
        tempVec.set(arr[ix], arr[iy], arr[iz]);
        const dir = blackholePos.clone().sub(tempVec);
        const dist = dir.length();
        if (dist > 0.05) {
          const pullForce = strength * delta * 2.5 / (dist * 0.5 + 0.3);
          dir.normalize().multiplyScalar(pullForce);
          arr[ix] += dir.x;
          arr[iy] += dir.y;
          arr[iz] += dir.z;
        } else {
          // Swirl near center
          const angle = delta * 8;
          const cx = arr[ix] - blackholePos.x;
          const cy = arr[iy] - blackholePos.y;
          arr[ix] = blackholePos.x + cx * Math.cos(angle) - cy * Math.sin(angle);
          arr[iy] = blackholePos.y + cx * Math.sin(angle) + cy * Math.cos(angle);
          // Shrink toward center
          arr[ix] += (blackholePos.x - arr[ix]) * delta * 2;
          arr[iy] += (blackholePos.y - arr[iy]) * delta * 2;
        }
      } else {
        // Restore to original positions
        arr[ix] += (originals[ix] - arr[ix]) * delta * 1.5;
        arr[iy] += (originals[iy] - arr[iy]) * delta * 1.5;
        arr[iz] += (originals[iz] - arr[iz]) * delta * 1.5;
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

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;

    const strength = mouseState.idleStrength;
    blackholePos.set(mouseState.ndcX * 3, mouseState.ndcY * 2, 0);

    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      if (strength > 0.01) {
        tempVec.set(arr[ix], arr[iy], arr[iz]);
        const dir = blackholePos.clone().sub(tempVec);
        const dist = dir.length();
        if (dist > 0.05) {
          const pullForce = strength * delta * 3.0 / (dist * 0.4 + 0.2);
          dir.normalize().multiplyScalar(pullForce);
          arr[ix] += dir.x;
          arr[iy] += dir.y;
          arr[iz] += dir.z;
        } else {
          const angle = delta * 10;
          const cx = arr[ix] - blackholePos.x;
          const cy = arr[iy] - blackholePos.y;
          arr[ix] = blackholePos.x + cx * Math.cos(angle) - cy * Math.sin(angle);
          arr[iy] = blackholePos.y + cx * Math.sin(angle) + cy * Math.cos(angle);
          arr[ix] += (blackholePos.x - arr[ix]) * delta * 3;
          arr[iy] += (blackholePos.y - arr[iy]) * delta * 3;
        }
      } else {
        arr[ix] += (originals[ix] - arr[ix]) * delta * 1.5;
        arr[iy] += (originals[iy] - arr[iy]) * delta * 1.5;
        arr[iz] += (originals[iz] - arr[iz]) * delta * 1.5;
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
