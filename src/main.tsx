import { StrictMode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { worker } from "./mocks/browser";

worker
  .start()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </StrictMode>
    );
  })
  .catch((error) => console.error(error));
