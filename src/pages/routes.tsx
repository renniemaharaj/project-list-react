import Index from "./index/index";
import Missing from "./missing";
import CreateProject from "./createProject";
import CreateClient from "./createClient"
import ProjectRoute from "./project";
import Discovery from "./discovery";
import Layout from "./Layout";
import type { CustomRoute, IndexRoute } from "../routing";

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
    path: "/create/project",
    element: (
      <Layout>
        <CreateProject />
      </Layout>
    ),
  },
  {
    path: "/create/client",
    element: (
      <Layout>
        <CreateClient />
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
