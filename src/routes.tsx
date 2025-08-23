import Index from "./pages/page/index";
import Missing from "./pages/page/views/missing";
import type { CustomRoute, IndexRoute } from "./pages/page/routing";
import CreateDocument from "./pages/page/views/create";

import Base from "./pages/page/base";

export const protectedRoutes: CustomRoute[] = [];

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  {
    index: true,
    element: (
      <Base>
        <Index />
      </Base>
    ),
  },
  { path: "*", element: <Missing /> },
  {
    path: "/create",
    element: (
      <Base>
        <CreateDocument />
      </Base>
    ),
  },
];