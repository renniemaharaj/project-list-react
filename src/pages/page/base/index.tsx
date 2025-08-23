import { memo, type ReactNode } from "react";
import SubNavBar from "../nav/SubNavBar";
import { Box } from "@primer/react-brand";
import CreateFormDialog from "../forms/CreateDialog";
import SidePane from "../sidepane/SidePane";
import { FScreenLayout } from "./FScreenLayout";

const Base = ({ children }: { children?: ReactNode }) => {
  return (
    <Box>
      {/** Import create form dialog */}
      <CreateFormDialog />
      {/* <SplitPageLayout> */}
      <FScreenLayout
        header={<SubNavBar />}
        side={<SidePane />}
        content={children}
      />
    </Box>
  );
};

export default memo(Base);
