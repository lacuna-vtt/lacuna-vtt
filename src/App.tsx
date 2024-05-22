import { useEffect, useState } from "react";
import { useNakamaContext } from "./NakamaContext";
import "./App.sass";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);
  const ctx = useNakamaContext();

  return (
    <div>
      {ctx.isConnected ? <></> : <LoginPage />}
      {ctx.isConnected ? <pre>{JSON.stringify(ctx, null, 2)}</pre> : <></>}
    </div>
  );
}

export default App;
