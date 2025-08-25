import { format } from "date-fns";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Flex, Text } from "@radix-ui/themes";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@primer/react";
import Avatar from "@mui/material/Avatar";
import { useNavigationTransition } from "../../state/hooks/transition/useNavigationTransition";

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
            variant="link"
            className={`holographic-card w-full`}
            onClick={() => transitionTo(`/project/${project.ID}`)}
            aria-label="Open this project"
          >
            <ChevronRightIcon />
          </Button>
        </div>
      )}

      <Flex
        className={`${
          size === "lg" ? "h-20" : "h-0"
        } overflow-auto flex flex-col gap-3 transition-all`}
      >
        {/* Manager Info */}
        {projectMeta?.manager && (
          <Flex className="items-center gap-2">
            <Text size="2" className="font-medium">
              Project Manager:{" "}
              {(projectMeta as ProjectMetaData)?.manager.firstName}{" "}
              {projectMeta.manager.lastName}
            </Text>
            <Avatar
              src={projectMeta?.manager.profilePicture}
              // fallback={projectMeta.manager.firstName}
              alt={`${projectMeta.manager.firstName} ${projectMeta.manager.lastName}`}
              // className="!w-4 !h-4"
            />
          </Flex>
        )}

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
      </Flex>
    </>
  );
};

export default ProjectMeta;
