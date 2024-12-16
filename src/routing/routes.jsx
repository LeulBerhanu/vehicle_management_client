import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/Pages/HomePage";
import { AddVehiclePage } from "@/Pages/Vehicles/AddVehiclePage";
import { UpdateVehiclePage } from "@/Pages/Vehicles/UpdateVehiclePage";
import ErrorPage from "@/Pages/ErrorPage";
import MainLayout from "@/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add-vehicle",
        element: <AddVehiclePage />,
      },
      {
        path: "update-vehicle/:vehicleId",
        element: <UpdateVehiclePage />,
      },
    ],
  },
]);

export default router;
