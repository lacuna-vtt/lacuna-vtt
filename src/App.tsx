import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.sass";
import { NakamaProvider } from "./NakamaContext";
import DebugPage from "./pages/DebugPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DebugPage />,
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
