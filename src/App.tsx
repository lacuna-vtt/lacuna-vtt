import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.sass";
import { NakamaProvider } from "./NakamaContext";
import DebugPage from "./pages/DebugPage";
import LobbyPage from "./pages/LobbyPage";
import GamePlayPage from "./pages/GamePlayPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LobbyPage />,
  },
  {
    path: "/game/:gameId",
    element: <GamePlayPage />,
  },
]);

function App() {
  return (
    <NakamaProvider>
      <RouterProvider router={router} />
    </NakamaProvider>
  );
}

export default App;
