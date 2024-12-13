import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./layouts/Main";
import { RouterProvider } from "react-router";
import router from "./routing/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main>
      <RouterProvider router={router} />
    </Main>
  </StrictMode>
);
