import { createBrowserRouter } from "react-router-dom";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <NavbarHome />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/hotel",
        element: <fetchHotel />,
      },
    ],
  },
]);
