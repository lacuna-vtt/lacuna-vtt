import { useEffect, useState } from "react";
import { Client } from "@heroiclabs/nakama-js";
import "./App.sass";
import { useNakamaContext } from "./NakamaContext";

// const useSsl = false;
// const client = new Client("defaultkey", "127.0.0.1", "7350", useSsl);

function App() {
  const [count, setCount] = useState(0);
  const ctx = useNakamaContext();

  useEffect(() => {
    const login = async () => {
      const session = await ctx.client?.authenticateEmail(
        "garrett@astralfrontier.org",
        "password"
      );
      ctx.setSession(session);
    };
    login();
  });

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Nakama data:</p>
      <ul>
        <li>isConnected: {ctx.isConnected ? "true" : "false"}</li>
      </ul>
    </div>
  );
}

export default App;
