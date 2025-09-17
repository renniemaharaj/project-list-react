import { format } from "date-fns";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Flex } from "@radix-ui/themes";
import { ChevronRightIcon } from "lucide-react";
import { useNavigationTransition } from "../../state/hooks/transition/useNavigationTransition";
import ProjectActivity from "./ProjectActivity";
import { Button } from "@mui/material";

const ProjectMeta = ({
  project,
  projectMeta,
  size = "sm",
}: {
  project: ProjectProps;
  projectMeta: ProjectMetaData;
  size?: "sm" | "lg";
}) => {
  const { transitionTo } = useNavigationTransition();
  const formatDate = (timestamp: number) => {
    if (timestamp) return format(new Date(timestamp), "MMM dd, yyyy");
  };

  return (
    <>
      {/* Collapse/Expand Button */}
      {size === "sm" && (
        <div className="w-full overflow-auto">
          <Button
            size="small"
            variant="outlined"
            className={`w-full  flex items-center justify-between text-sm`}
            onClick={() => transitionTo(`/project/${project.ID}`)}
            aria-label="Open this project"
          >
           Open Project <ChevronRightIcon className="w-2 h-2 ml-2" />
          </Button>
        </div>
      )}

      <Flex
        className={`${
          size === "lg" ? "h-20" : "h-0"
        } overflow-auto flex flex-col gap-3 transition-all`}
      >
        {/* Project Basic Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <Flex className="flex gap-3 flex-row">
            <span>
              <strong>ID:</strong>
              <br /> {project.ID}
            </span>
            <span>
              <strong>Number:</strong>
              <br /> {project.number}
            </span>
          </Flex>

          <Flex className="flex gap-3 flex-row">
            <span>
              <strong>Start:</strong>
              <br /> {formatDate(project.startDate)}
            </span>
            <span>
              <strong>Projected Start:</strong>
              <br />
              {formatDate(project.projectedStartDate)}
            </span>
          </Flex>

          <Flex className="flex gap-3 flex-row">
            <span>
              <strong>End:</strong>
              <br /> {formatDate(project.endDate)}
            </span>
            <span>
              <strong>Projected End:</strong>
              <br />
              {formatDate(project.projectedEndDate)}
            </span>
          </Flex>
        </div>

        {/* Project Activity Sparkline */}
        {projectMeta && <ProjectActivity projectMeta={projectMeta} />}
      </Flex>
    </>
  );
};

export default ProjectMeta;
