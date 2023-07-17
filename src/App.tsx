import { Canvas } from "@react-three/fiber";

import "./App.css";
import "./features/Carousel/components/button.css";
import { Experience } from "./components/Experience";
import { WalletIntegration } from "./features/WalletIntegration/WalletIntegration";
import { UserContextProvider } from "./components/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <WalletIntegration />
        <Canvas camera={{ fov: 50, position: [0, 0, 5] }}>
          <Experience />
        </Canvas>
      </UserContextProvider>
    </>
  );
}

export default App;
