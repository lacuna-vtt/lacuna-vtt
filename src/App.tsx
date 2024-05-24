import { useState } from "react";
import { useNakamaContext } from "./NakamaContext";
import "./App.sass";
import LoginPage from "./pages/LoginPage";
import DebugPage from "./pages/DebugPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DebugPage />,
  },
]);

function App() {
  const [count, setCount] = useState(0);
  const ctx = useNakamaContext();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
