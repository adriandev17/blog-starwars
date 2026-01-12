import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { SinglePlanet } from "./pages/SinglePlanet";
import { SingleVehicle } from "./pages/SingleVehicle"; // <--- 1. IMPORTAR

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Not found!</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/single/:theId",
        element: <Single />,
      },
      {
        path: "/single-planet/:theId",
        element: <SinglePlanet />,
      },
      {
        path: "/single-vehicle/:theId", // <--- 2. NUEVA RUTA
        element: <SingleVehicle />,
      },
    ],
  },
]);