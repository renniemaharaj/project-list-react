import { Flex, Heading, IconButton, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "@primer/react";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import Project from "../../pkg/project";
import ProjectTable from "../../pkg/project/ProjectTable";

const ProjectResults = ({
  data,
  variant = "list",
  onPagePrevious,
  onPageForward,
}: {
  data: number[];
  variant?: "list" | "card" | "full";
  onPagePrevious?: () => void;
  onPageForward?: () => void;
}) => {
  const [renderView, setRenderView] = useState<"list" | "card" | "full">(
    variant
  );

  return (
    <Flex className="flex flex-col gap-4">
      {/* Header Controls */}
      <Flex className="flex w-full !flex-row gap-2 !justify-end items-center">
        {/* View Controls */}
        <IconButton
          size="1"
          aria-label="List View"
          onClick={() => setRenderView("list")}
          disabled={renderView === "list"}
        >
          <LayoutGrid className="w-2 h-2" />
        </IconButton>

        <IconButton
          size="1"
          aria-label="Card View"
          onClick={() => setRenderView("card")}
          disabled={renderView === "card"}
        >
          <LayoutGrid className="w-2 h-2" />
        </IconButton>

        <IconButton
          size="1"
          aria-label="Full View"
          onClick={() => setRenderView("full")}
          disabled
        >
          <StretchHorizontal className="w-2 h-2" />
        </IconButton>

        {/* Pagination Controls */}
        {onPagePrevious && (
          <Button variant="link" onClick={onPagePrevious} aria-label="Previous">
            Previous
          </Button>
        )}

        {onPageForward && (
          <Button variant="link" onClick={onPageForward} aria-label="Next Page">
            Forward
          </Button>
        )}
      </Flex>

      {/* Project Listing */}
      <Flex
        className={`flex flex-wrap justify-start gap-2 transition-all duration-300 ${
          renderView === "full"
            ? "flex-col"
            : renderView === "card"
            ? "flex-row"
            : "flex-col"
        }`}
      >
        {renderView === "list" ? (
          <ProjectTable projectIDs={data} />
        ) : (
          <>
            {/* Show first 10 projects as card/full */}
            {data.slice(0, 10).map((projectID) => (
              <Project
                key={projectID}
                projectID={projectID}
                variant={renderView}
              />
            ))}

            <Separator size="4" />

            {/* Show remaining projects as table */}
            {data.length > 10 && (
              <div className="w-full mt-4">
                <Heading className="text-md !mb-2">Remaining Results</Heading>
                <ProjectTable projectIDs={data.slice(10)} />
              </div>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ProjectResults;
