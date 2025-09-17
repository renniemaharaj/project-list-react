import { Flex, Heading, Text, Spinner } from "@radix-ui/themes";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import ProjectMeta from "./ProjectMeta";
import Card from "@mui/material/Card";
import AnimatedNumber from "../animatedNumber";
import { PieChart } from "@mui/x-charts";
import { Token } from "@primer/react";
import TimeEntries from "./TimeEntries";
import useProjectComputed from "../../state/hooks/useProjectComputed";
import { useRef } from "react";
import useThemeContext from "../../state/hooks/theme/useThemeContext";

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

  return (
    <div
      ref={parentRef}
      className={`${variant === "card" ? "max-w-[22rem]" : "w-full"}`}
    >
      {
        <>
          {variant === "full" && (
            <TimeEntries
              timeEntries={projectMeta?.timeEntries}
              consultants={projectMeta?.consultants}
            />
          )}

          <Card
            elevation={2}
            className={`${theme === "light" ? "!bg-blue-50" : ""} p-4 shadow-md rounded-xl transition-all`}
          >
            <Flex direction="column" gap="4">
              {/* Header */}
              <Flex align="center" justify="between">
                <Heading size="4" className="font-semibold">
                  {project.name}
                </Heading>
                <Token
                  color={outOfBudget ? "red" : "green"}
                  text={outOfBudget ? "OOB" : "Healthy"}
                />
              </Flex>

              {/* Metrics / Gauges */}
              <Flex align="center" justify="between" className="gap-6">
                <div className="flex gap-6">
                  <div>
                    <Text size="2" className="font-medium text-gray-700">
                      Hrs Assigned
                    </Text>
                    <div className="text-lg font-semibold">
                      <AnimatedNumber
                        number={debit}
                        fontStyle={{ fontSize: 20 }}
                      />{" "}
                      hrs
                    </div>
                  </div>
                  <div>
                    <Text size="2" className="font-medium text-gray-700">
                      Hrs Used
                    </Text>
                    <div className="text-lg font-semibold">
                      <AnimatedNumber
                        number={credit}
                        fontStyle={{
                          fontSize: 20,
                          color: credit > debit ? "red" : "green",
                        }}
                      />{" "}
                      hrs
                    </div>
                  </div>
                </div>

                {variant === "card" ? (
                  <Gauge
                    width={100}
                    height={100}
                    value={credit}
                    valueMax={debit || 1}
                    text={({ value, valueMax }) =>
                      `${parseFloat(value?.toFixed(1) ?? "0")}/${parseFloat(
                        valueMax.toFixed(1)
                      )}`
                    }
                    sx={{
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: credit > debit ? "red" : "#52b202",
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "#e5e7eb", // neutral gray
                      },
                    }}
                  />
                ) : (
                  typeof projectMeta === "object" && (
                    <PieChart
                      series={[
                        {
                          data: groupTimeEntriesByConsultant(
                            projectMeta?.timeEntries ?? []
                          ),
                        },
                      ]}
                      width={180}
                      height={180}
                    />
                  )
                )}
              </Flex>

              {/* Description (only full) */}
              {variant === "full" && (
                <Text size="2" className="text-gray-600 leading-relaxed">
                  <strong>Description</strong>
                  <br /> {project.description}
                </Text>
              )}

              {/* Meta Info */}
              <ProjectMeta
                size={variant === "full" ? "lg" : "sm"}
                project={project}
                projectMeta={projectMeta as ProjectMetaData}
              />

              {/* Loading / Error States */}
              {isLoading && (
                <Flex justify="center" className="py-4">
                  <Spinner size="3" />
                </Flex>
              )}
              {error && (
                <Text size="2" className="text-red-600 text-center">
                  Failed to load project metrics
                </Text>
              )}
            </Flex>
          </Card>
        </>
      }
    </div>
  );
}
