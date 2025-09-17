import { useRef } from "react";
import { Flex, Heading, Text, Separator, HoverCard } from "@radix-ui/themes";
import Card from "@mui/material/Card";
import { PieChart } from "@mui/x-charts";
import { Token } from "@primer/react";

import ProjectMeta from "./ProjectMeta";
import ProjectActivity from "./ProjectActivity";
import TimeEntries from "./TimeEntries";

import useProjectComputed from "../../state/hooks/useProjectComputed";
import useThemeContext from "../../state/hooks/theme/useThemeContext";

import type { ProjectMetaData, ProjectProps } from "./types";
import ProjectMetrics from "./ProjectMetrics";
import ProjectGauge from "./ProjectGauge";

export default function ProjectCard({
  project,
  variant,
}: {
  project: ProjectProps;
  variant: "list" | "card" | "full";
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeContext();

  const {
    projectMeta,
    debit,
    credit,
    outOfBudget,
    groupTimeEntriesByConsultant,
    error,
    isLoading,
  } = useProjectComputed(project.ID, parentRef);

  if (error) {
    return (
      <Text size="2" className="text-red-600 text-center">
        Failed to load project metrics
      </Text>
    );
  }

  const hoverBorderColor =
    theme === "light" ? "hover:!border-blue-500" : "hover:!border-purple-400";

  return (
    <div
      ref={parentRef}
      className={`${variant === "card" ? "max-w-[22rem]" : "w-full"} ${
        isLoading ? "animate-pulse" : ""
      }`}
    >
      {/* Show time entries only in full variant */}
      {variant === "full" && (
        <TimeEntries
          timeEntries={projectMeta?.timeEntries}
          consultants={projectMeta?.consultants}
        />
      )}

      <Card
        variant="outlined"
        className={`!transition-all !duration-300 ease-in-out shadow-inner flex flex-col items-stretch
        ${theme === "light" ? "!bg-blue-50" : ""}
        hover:!border ${hoverBorderColor} rounded-md overflow-hidden`}
      >
        <Flex direction="column" className="p-2 pb-0" gap="4">
          {/* Header */}
          <Flex align="center" gap="2" justify="between">
            <Heading size="4" className="font-semibold truncate">
              {project.name}
            </Heading>
            <Token
              color={outOfBudget ? "red" : "green"}
              text={outOfBudget ? "OOB" : "Healthy"}
            />
          </Flex>
          <Separator size="4" />

          {/* Metrics + Visualization */}
          <Flex align="center" justify="between" className="gap-6">
            <ProjectMetrics debit={debit} credit={credit} />

            <Separator size="2" orientation="vertical" />

            {variant === "card" ? (
              <ProjectGauge debit={debit} credit={credit} />
            ) : (
              projectMeta && (
                <PieChart
                  width={180}
                  height={180}
                  series={[
                    {
                      data: groupTimeEntriesByConsultant(
                        projectMeta.timeEntries ?? []
                      ),
                    },
                  ]}
                />
              )
            )}
          </Flex>

          {/* Description only for full view */}
          {variant === "full" && (
            <Text size="2" className="text-gray-600 leading-relaxed">
              <strong>Description</strong>
              <br />
              {project.description}
            </Text>
          )}

          <Separator size="4" />

          {/* Meta Info */}
          <ProjectMeta
            size={variant === "full" ? "lg" : "sm"}
            project={project}
            projectMeta={projectMeta as ProjectMetaData}
          />
        </Flex>

        {/* Activity Sparkline */}
        {/* Activity */}
        {projectMeta &&
          (variant === "card" ? (
            <HoverCard.Root closeDelay={150}>
              <HoverCard.Trigger>
                <div className="cursor-pointer p-2 text-sm text-gray-500 text-center hover:text-gray-700">
                  View Activity
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content
                side="top"
                align="center"
                className="z-50 rounded-md shadow-lg bg-white dark:bg-gray-900 p-3 w-40"
              >
                <ProjectActivity projectMeta={projectMeta} />
              </HoverCard.Content>
            </HoverCard.Root>
          ) : (
            <ProjectActivity projectMeta={projectMeta} />
          ))}
      </Card>
    </div>
  );
}
