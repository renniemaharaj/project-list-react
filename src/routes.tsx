import Index from "./pages/page/views/Index";
import Missing from "./pages/page/views/Missing";
import type { CustomRoute, IndexRoute } from "./pages/page/routing";
import CreateDocument from "./pages/page/views/Create";

import Base from "./pages/page/Base";

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