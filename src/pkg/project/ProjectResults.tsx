import { Flex, Heading, IconButton, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import Project from "../../pkg/project";
import ProjectTable from "../../pkg/project/ProjectTable";
import { Button } from "@primer/react";

const ProjectResults = ({
  data,
  variant = "list",
  className,
  onPagePrevious,
  onPageForward,
}: {
  data: number[];
  className?: string;
  variant?: "list" | "card" | "full";
  onPagePrevious?: () => void;
  onPageForward?: () => void;
}) => {
  const [renderView, setRenderView] = useState<"list" | "card" | "full">(
    variant
  );

  return (
    <Flex className={`${className} flex flex-col justify-center gap-2`}>
      {/* Header Controls */}
      <Flex className="flex w-full !flex-row px-2 gap-2 !justify-end items-center">
        {/* View Controls Group */}
        <Flex className="flex flex-row gap-1 px-1 py-0.5 rounded-md">
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
        </Flex>

        {/* Pagination Controls Group */}
        <Flex className="flex flex-row gap-1 px-2 py-0.5 rounded-md">
          {onPagePrevious && (
            <Button
              size="small"
              variant="link"
              onClick={onPagePrevious}
              aria-label="Previous"
            >
              Previous
            </Button>
          )}

          {onPageForward && (
            <Button
              size="small"
              variant="link"
              onClick={onPageForward}
              aria-label="Next Page"
            >
              Forward
            </Button>
          )}
        </Flex>
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
            <Flex className="flex flex-row gap-3 flex-wrap !justify-center">
              {/* Show first 10 projects as card/full */}
              {data.slice(0, 10).map((projectID) => (
                <Project
                  key={projectID}
                  projectID={projectID}
                  variant={renderView}
                />
              ))}
            </Flex>

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
