import { format } from "date-fns";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@primer/react";

const Meta = ({
  project,
  projectMeta,
}: {
  project: ProjectProps;
  projectMeta: ProjectMetaData;
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const formatDate = (timestamp: number) =>
    format(new Date(timestamp), "MMM dd, yyyy");
  return (
    <>
      {/* Collapse/Expand Button */}
      <div className="w-full mb-2 overflow-auto">
        <Button
          size="small"
          variant="default"
          className="holographic-card w-full"
          onClick={() => setIsMinimized(!isMinimized)}
          aria-label={isMinimized ? "Expand panel" : "Collapse panel"}
        >
          {isMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      </div>

      <Flex
        className={`${
          isMinimized ? "h-0" : "h-20"
        } overflow-auto flex flex-col gap-3 transition-all`}
      >
        {/* Manager Info */}
        {projectMeta?.manager && (
          <Flex className="items-center gap-2 mb-2">
            <Avatar
              src={projectMeta?.manager.profilePicture}
              fallback={projectMeta.manager.firstName[0]}
              alt={`${projectMeta.manager.firstName} ${projectMeta.manager.lastName}`}
              className="w-10 h-10 border border-white"
            />
            <Text size="2" className="font-medium">
              Project Manager: {(projectMeta as ProjectMetaData)?.manager.firstName}{" "}
              {projectMeta.manager.lastName}
            </Text>
          </Flex>
        )}

        {/* Project Basic Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <Flex className="flex gap-3 flex-row">
            <span>
              <strong>ID:</strong>
              <br /> {project.id}
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

export default Meta;
