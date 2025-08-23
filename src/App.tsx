import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { AuthRouter } from "./pkg/firebase/auth/AuthRouter";
import { protectedRoutesFunc, publicRoutesFunc } from "./pages/page/routing";

import "@primer/react-brand/lib/css/main.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";
import { ThemeProvider, BaseStyles } from "@primer/react";
import EBoundary from "./pages/page/views/eBoundary";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider as LocalThemeProvider } from "./hooks/theme/ThemeProvider";
import useThemeContext from "./hooks/theme/useThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <LocalThemeProvider>
      <ErrorBoundary FallbackComponent={EBoundary}>
        <AppShell />
      </ErrorBoundary>
    </LocalThemeProvider>
  );
}

function AppShell() {
  const { theme } = useThemeContext();
  const queryClient = new QueryClient();
  return (
    <ThemeProvider
      colorMode={
        ((theme === "dark" && "dark") ||
          (theme === "light" && "light") ||
          (theme === "inherit" && "auto")) as "dark" | "light" | "auto"
      }
    >
      <BaseStyles>
        <Theme
         appearance={theme}
         accentColor="gold"
         radius="full"
         asChild={false}
         // hasBackground={true}
         panelBackground="translucent"
         scaling="110%"
         grayColor="sage"
         className=""
       >
        <QueryClientProvider client={queryClient}>
        <AppRoutes />
        </QueryClientProvider>
    </Theme>
      </BaseStyles>
    </ThemeProvider>
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