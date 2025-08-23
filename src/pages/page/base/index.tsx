import { useCallback, type ReactNode } from "react";
import SubNavBar from "../nav/SubNavBar";
import { Box } from "@primer/react-brand";
import CreateFormDialog from "../forms/CreateDialog";
import SidePane from "../sidepane/SidePane";
import { FScreenLayout } from "./FScreenLayout";

const Base = ({ children }: { children?: ReactNode }) => {

  const pageContent = useCallback(() => {
    return <></>
  }, []);

  return (
    <Box>
      {/** Import create form dialog */}
      <CreateFormDialog />
      {/** Children (Do not pass actual react nodes)*/}
      {children}
      {/* <SplitPageLayout> */}
      <FScreenLayout
        header={<SubNavBar />}
        side={<SidePane />}
        content={pageContent()}
      />
    </Box>
  );
};

export default Base;
