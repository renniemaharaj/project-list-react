import { Avatar, Badge, Flex, Heading, Text } from "@radix-ui/themes";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Spinner } from "@radix-ui/themes";
import useQueryProjectMeta from "../../state/hooks/tanstack/useQueryProjectMeta";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { differenceInDays } from "date-fns";
import Meta from "./Meta";
import useThemeContext from "../../hooks/theme/useThemeContext";
import Card from "@mui/material/Card";
import AnimatedNumber from "../animatedNumber";
import * as motion from "motion/react-client";
import { PieChart } from "@mui/x-charts";
import { useCallback, useEffect, useState } from "react";

export default function ProjectCard({
  project,
  size = "sm",
}: {
  project: ProjectProps;
  size?: "sm" | "lg";
}) {
  const { data, error, isLoading, setProjectID } = useQueryProjectMeta();
  const [projectMeta, setProjectMeta] = useState<ProjectMetaData>();

  useEffect(() => {
    setProjectID(project.ID);
  }, [project, setProjectID]);

  useEffect(() => {
    if (!data) return;
    setProjectMeta(data);
  }, [data]);

  const { theme } = useThemeContext();

  const debit =
    projectMeta?.timeEntries
      .filter((e) => e.type === "debit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  const credit =
    projectMeta?.timeEntries
      .filter((e) => e.type === "credit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  const outOfBudget = credit > debit;

  // Check if recently updated (within a week)
  const recent =
    projectMeta &&
    differenceInDays(
      new Date(),
      new Date(projectMeta.timeEntries[-1]?.dateCreated ?? Date.now())
    ) <= 7;

  const getConsultantNameByID = useCallback(
    (timeEntry: number) => {
      const consultants = projectMeta?.consultants;
      const consultant = consultants?.find(
        (consultant) => consultant.ID === timeEntry
      );
      return consultant?.firstName ?? "Unknown";
    },
    [projectMeta]
  );

  return (
    <motion.div
      className={`${size === "lg" && "!w-full"}`}
      initial={{ x: -100, opacity: 0 }} // start below and hidden
      animate={{ x: 0, opacity: 1 }} // move up into place
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Card
        variant="outlined"
        className={`p-4 transition-all w-full ${
          recent ? "border-2 border-transparent" : " border-red-400"
        } ${theme === "light" ? "!bg-blue-50" : ""}`}
      >
        <Flex className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <Heading className="text-xl font-semibold">{project.name}</Heading>
            <Badge color={outOfBudget ? "red" : "green"}>
              {/* {outOfBudget ? "OOB" : "Healthy"} */}
            </Badge>
          </div>

          {/* Metrics / Gauge */}
          <Flex className="flex flex-row items-center justify-between mb-4">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-600">
                  Hrs Assigned
                </span>
                <span className="text-lg font-semibold">
                  <AnimatedNumber
                    number={debit}
                    fontStyle={{ fontSize: 30, color: "green" }}
                  />
                  hrs
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-purple-600">
                  Hrs Used
                </span>
                <span>
                  <AnimatedNumber
                    number={credit}
                    fontStyle={{
                      fontSize: 30,
                      color: credit > debit ? "red" : "green",
                    }}
                  />
                  hrs
                </span>
              </div>
            </div>
            {size === "sm" ? (
              <Gauge
                width={100}
                height={100}
                value={credit}
                valueMax={debit || 1}
                text={({ value, valueMax }) =>
                  `${Math.round(value ?? 0)} / ${Math.round(valueMax)}`
                }
                sx={{
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: credit > debit ? "red" : "#52b202",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: "#ccc",
                  },
                }}
              />
            ) : (
              typeof projectMeta === "object" && (
                <PieChart
                  series={[
                    {
                      data: projectMeta?.timeEntries
                        ?.filter((timeEntry) => timeEntry.type !== "credit")
                        .map((timeEntry) => ({
                          id: timeEntry.ID,
                          value: Math.round(timeEntry.hours),
                          label: getConsultantNameByID(timeEntry.consultantID),
                        })),
                    },
                  ]}
                  width={120}
                  height={120}
                />
              )
            )}
          </Flex>

          <Text size="2" className="text-sm text-gray-600">
            <span>
              <strong>Description</strong>
              <br /> {project.description}
            </span>
          </Text>

          <Meta
            size={size}
            project={project}
            projectMeta={projectMeta as ProjectMetaData}
          />

          {isLoading ? (
            <div className="flex justify-center py-6">
              <Spinner className="w-6 h-6 text-blue-500" />
            </div>
          ) : error ? (
            <Text size="2" className="text-sm text-red-600">
              Failed to load project metrics
            </Text>
          ) : (
            <>
              {/* Consultants */}
              <div className="flex -space-x-3">
                {projectMeta?.consultants?.map((c) => (
                  <Avatar
                    key={c.ID}
                    src={c.profilePicture}
                    alt={`${c.firstName} ${c.lastName}`}
                    fallback={c.firstName[0]}
                    className="border border-white w-10 h-10"
                  />
                ))}
              </div>
            </>
          )}
        </Flex>
      </Card>
    </motion.div>
  );
}
