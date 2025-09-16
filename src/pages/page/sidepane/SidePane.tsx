import { BookIcon } from "lucide-react";
import useQueryProjects from "../../../state/hooks/tanstack/useQueryProjects";
import { Blankslate } from "@primer/react/experimental";
import { projectExplorerPageNumberAtom } from "../../../state/app.atoms";
import { useAtom } from "jotai";
import useThemeContext from "../../../state/hooks/theme/useThemeContext";
import { Card, Button } from "@mui/material";
import { useRef } from "react";
import ProjectTable from "../../../pkg/project/ProjectTable";

const SidePane = () => {
  const { error, data } = useQueryProjects();
  const { theme } = useThemeContext();
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
    <Card variant="outlined" className={`${theme === "light" ? "!bg-blue-50" : ""}`}>
      {/* <CardContent> */}
        <ProjectTable projectIDs={data ?? []} containerRef={tableRef} />
      {/* </CardContent> */}

      <div className="flex flex-row">
        {projectExplorerPageNumber > 0 && (
          <Button size="small" variant="text" className="w-full" onClick={decrementPage}>
            Previous Page
          </Button>
        )}
        <Button size="small" variant="text" className="w-full" onClick={incrementPage}>
          Next Page
        </Button>
      </div>
    </Card>
  );
};

export default SidePane;
