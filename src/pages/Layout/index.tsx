import { memo, type ReactNode } from "react";
import SubdomainNavbar from "./subdomainNavbar/SubNavBar";
import { Box } from "@primer/react-brand";
import CreateFormDialog from "../forms/CreateDialog";
import { FScreenLayout } from "./FScreenLayout";
import SidePane from "./sidepane/SidePane";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <Box>
      {/** Import create form dialog */}
      <CreateFormDialog />
      {/* <SplitPageLayout> */}
      <FScreenLayout
        header={<SubdomainNavbar />}
        side={<SidePane />}
        content={children}
      />
    </Box>
  );
};

export default memo(Layout);
