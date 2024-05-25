import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.sass";
import { NakamaProvider } from "./NakamaContext";
import DebugPage from "./pages/DebugPage";
import LobbyPage from "./pages/LobbyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LobbyPage />,
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
