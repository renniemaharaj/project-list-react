import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "@primer/react-brand/lib/css/main.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";

import {
  ThemeProvider as PrimerThemeProvider,
  BaseStyles,
} from "@primer/react";
import { Theme as RadixTheme } from "@radix-ui/themes";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthRouter } from "./pkg/firebase/auth/AuthRouter";
import { protectedRoutesFunc, publicRoutesFunc } from "./pages/page/routing";
import ErrorFallback from "./pages/error";

import { ThemeProvider as LocalThemeProvider } from "./state/hooks/theme/ThemeProvider";
import useThemeContext from "./state/hooks/theme/useThemeContext";

function App() {
  return (
    // Local context: stores and provides "light" | "dark"
    <LocalThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppShell />
      </ErrorBoundary>
    </LocalThemeProvider>
  );
}

function AppShell() {
  const { theme } = useThemeContext(); // "light" | "dark"
  const queryClient = new QueryClient();

  // MUI theme adapts to local theme
  const muiTheme = createTheme({
    palette: {
      mode: theme === "light" ? "light" : "dark",
    },
  });

  return (
    // Primer theme provider
    <PrimerThemeProvider colorMode={theme as "light" | "dark"}>
      <BaseStyles>
        {/* Radix theme decorator */}
        <RadixTheme
          appearance={theme}
          accentColor="gold"
          radius="full"
          panelBackground="translucent"
          scaling="110%"
          grayColor="sage"
        >
          {/* React Query */}
          <QueryClientProvider client={queryClient}>
            {/* MUI Theme */}
            <MUIThemeProvider theme={muiTheme}>
              {/* Routes */}
              <AppRoutes />
            </MUIThemeProvider>
          </QueryClientProvider>
        </RadixTheme>
      </BaseStyles>
    </PrimerThemeProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {publicRoutesFunc()}
      <Route element={<AuthRouter />}>{protectedRoutesFunc()}</Route>
    </Routes>
  );
}

export default App;
