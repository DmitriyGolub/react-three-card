import "./App.css";
import "./features/Carousel/components/button.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { WalletIntegration } from "./features/WalletIntegration/WalletIntegration";

function App() {
  return (
    <>
      <WalletIntegration />
      <Canvas camera={{ fov: 50, position: [0, 0, 5] }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
