import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/abril-fatface";
import "@fontsource/cabin";
import "@fontsource/cabin/500.css";
import "@fontsource/cabin/600.css";
import "@fontsource/cabin/700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
