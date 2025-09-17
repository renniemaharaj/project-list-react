import { BookIcon } from "lucide-react";
import { Blankslate } from "@primer/react/experimental";
import { useAtom } from "jotai";
// import { Button } from "@mui/material";
import { useRef } from "react";
// import { Separator } from "@radix-ui/themes";
import useQueryProjects from "../../../state/hooks/tanstack/useQueryProjects";
import { projectExplorerPageNumberAtom } from "../../../state/app.atoms";
// import ProjectTable from "../../../pkg/project/ProjectTable";
import ProjectResults from "../../../pkg/project/ProjectResults";

const SidePane = () => {
  const { error, data } = useQueryProjects();
  const [projectExplorerPageNumber, setProjectExplorerPageNumber] = useAtom(
    projectExplorerPageNumberAtom
  );

  const tableRef = useRef<HTMLDivElement>(null);

  const incrementPage = () => {
    tableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setProjectExplorerPageNumber((prev) => prev + 1), 500);
  };

  const decrementPage = () => {
    tableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(
      () => setProjectExplorerPageNumber((prev) => (prev > 0 ? prev - 1 : 0)),
      500
    );
  };

  if (error) {
    return (
      <Blankslate>
        <Blankslate.Visual>
          <BookIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading>Project Explorer</Blankslate.Heading>
        <Blankslate.Description>
          An error was encountered while fetching projects.
        </Blankslate.Description>
        <Blankslate.PrimaryAction href="/">Refresh</Blankslate.PrimaryAction>
      </Blankslate>
    );
  }

  return (
    <>
      <ProjectResults
        data={data ?? []}
        variant="card"
        onPagePrevious={
          projectExplorerPageNumber > 0 ? decrementPage : undefined
        }
        onPageForward={incrementPage}
      />
    </>
  );
};

export default SidePane;
