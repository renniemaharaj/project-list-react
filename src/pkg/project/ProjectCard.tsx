import { Flex, Heading, Text } from "@radix-ui/themes";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Spinner } from "@radix-ui/themes";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import ProjectMeta from "./ProjectMeta";
import useThemeContext from "../../state/hooks/theme/useThemeContext";
import Card from "@mui/material/Card";
import AnimatedNumber from "../animatedNumber";
import * as motion from "motion/react-client";
import { PieChart } from "@mui/x-charts";
import { Link, Token } from "@primer/react";
import TimeEntries from "./TimeEntries";
import { useNavigationTransition } from "../../state/hooks/transition/useNavigationTransition";

// 🔑 new hook import
import useProjectComputed from "../../state/hooks/useProjectComputed";
import { useRef } from "react";

export default function ProjectCard({
  project,
  variant,
}: {
  project: ProjectProps;
  variant: "list" | "card" | "full";
}) {
  
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    projectMeta,
    debit,
    credit,
    outOfBudget,
    groupTimeEntriesByConsultant,
    error,
    isLoading,
  } = useProjectComputed(project.ID, parentRef);

  const { transitionTo } = useNavigationTransition();
  const { theme } = useThemeContext();

  return (
    <div ref={parentRef}>
      {variant === "list" ? (
        <>
          <Link onClick={() => transitionTo(`/project/${project.ID}`)}>
            <Heading className="cursor-pointer !text-sm">
              {project.name}
            </Heading>
          </Link>
          <Token
            color={outOfBudget ? "red" : "green"}
            text={outOfBudget ? "OOB" : "Healthy"}
          />
        </>
      ) : (
        <>
          {variant === "full" && (
            <TimeEntries
              timeEntries={projectMeta?.timeEntries}
              consultants={projectMeta?.consultants}
            />
          )}

          <motion.div
            className={`${variant === "full" ? "!w-full" : "max-w-[21rem]"}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card
              variant="outlined"
              className={`p-4 transition-all w-full ${
                !projectMeta && "animate-pulse"
              } ${theme === "light" ? "!bg-blue-50" : ""}`}
            >
              <Flex className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex justify-between gap-2 items-center">
                  <Heading className="text-xl font-semibold">
                    {project.name}
                  </Heading>
                  <Token
                    color={outOfBudget ? "red" : "green"}
                    text={outOfBudget ? "OOB" : "Healthy"}
                  />
                </div>

                {/* Metrics / Gauges */}
                <Flex className="flex flex-row items-center justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-blue-600">
                        Hrs Assigned
                      </span>
                      <span className="text-lg font-semibold">
                        <AnimatedNumber
                          number={debit}
                          fontStyle={{ fontSize: 24 }}
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
                            fontSize: 24,
                            color: credit > debit ? "red" : "green",
                          }}
                        />
                        hrs
                      </span>
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
                          fill: "#ccc",
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

                {/* Description */}
                {variant === "full" && (
                  <Text size="2" className="text-sm text-gray-600">
                    <strong>Description</strong>
                    <br /> {project.description}
                  </Text>
                )}

                <ProjectMeta
                  size={variant === "full" ? "lg" : "sm"}
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
                ) : null}
              </Flex>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}
