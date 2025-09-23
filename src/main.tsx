import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createAppTheme } from "./theme";

const theme = createAppTheme();

createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>,
);
