import { useState } from "react";
import { useNakamaContext } from "./NakamaContext";
import "./App.sass";
import LoginPage from "./pages/LoginPage";
import DebugPage from "./pages/DebugPage";

function App() {
  const [count, setCount] = useState(0);
  const ctx = useNakamaContext();

  return (
    <div>
      {ctx.isConnected ? <></> : <LoginPage />}
      {ctx.isConnected ? <DebugPage /> : <></>}
    </div>
  );
}

export default App;
