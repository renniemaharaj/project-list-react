import { memo, type ReactNode } from "react";
import SubdomainNavbar from "./subdomainNavbar/SubNavBar";
import { Box } from "@primer/react-brand";
import { FScreenLayout } from "./FScreenLayout";
import SidePane from "./sidepane/SidePane";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <Box>
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
