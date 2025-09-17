import Index from "./pages/index/index";
import Missing from "./pages/missing";
import CreateProject from "./pages/create";
import ProjectRoute from "./pages/project";
import Discovery from "./pages/discovery";
import Layout from "./pages/Layout";
import type { CustomRoute, IndexRoute } from "./pages/routing";

export const protectedRoutes: CustomRoute[] = [];

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  {
    index: true,
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
   {
    path: "/search/:searchQuery",
    element: (
      <Layout>
        <Discovery />
      </Layout>
    ),
  },
  {
    path: "/project/:projectID",
    element: (
      <Layout>
        <ProjectRoute />
      </Layout>
    ),
  },
  {
    path: "/create",
    element: (
      <Layout>
        <CreateProject />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <Missing />
      </Layout>
    ),
  },
];
