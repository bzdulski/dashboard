// eslint-disable-next-line
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { AppRouter } from "./components/AppRouter"
import "./index.css"

createRoot(document.getElementById("App")).render(
  // <StrictMode>
    <AppRouter/>
  // </StrictMode>
)