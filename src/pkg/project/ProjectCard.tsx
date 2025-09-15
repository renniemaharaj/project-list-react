import { Flex, Heading, Text } from "@radix-ui/themes";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Spinner } from "@radix-ui/themes";
import useQueryProjectMeta from "../../state/hooks/tanstack/useQueryProjectMeta";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import ProjectMeta from "./ProjectMeta";
import useThemeContext from "../../state/hooks/theme/useThemeContext";
import Card from "@mui/material/Card";
import AnimatedNumber from "../animatedNumber";
import * as motion from "motion/react-client";
import { PieChart } from "@mui/x-charts";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Token } from "@primer/react";
import TimeEntries from "./TimeEntries";
import { useNavigationTransition } from "../../state/hooks/transition/useNavigationTransition";

export default function ProjectCard({
  project,
  variant,
}: {
  project: ProjectProps;
  variant: "list" | "card" | "full";
}) {
  const { data, error, isLoading, setProjectID } = useQueryProjectMeta();
  const [projectMeta, setProjectMeta] = useState<ProjectMetaData>();
  const { transitionTo } = useNavigationTransition();
  const { theme } = useThemeContext();

  useEffect(() => data && setProjectMeta(data), [data]);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  const debit =
    projectMeta?.timeEntries
      .filter((e) => e.type === "debit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  const credit =
    projectMeta?.timeEntries
      .filter((e) => e.type === "credit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  const outOfBudget = credit > debit;

  const getConsultantNameByID = useCallback(
    (timeEntry: number) =>
      projectMeta?.consultants?.find(
        (consultant) => consultant.ID === timeEntry
      )?.firstName ?? "Unknown",
    [projectMeta]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (parentRef.current) observer.observe(parentRef.current);
    return () => observer.disconnect();
  }, [parentRef]);

  useEffect(() => {
    if (inView) setProjectID(project.ID);
  }, [inView, project.ID, setProjectID]);

  useEffect(() => {
    if (data) setProjectMeta(data);
  }, [data]);

  function groupTimeEntriesByConsultant(
    timeEntries: {
      ID: number;
      consultantID: number;
      hours: number;
      type: string;
    }[],
    getConsultantNameByID: (id: number) => string
  ) {
    const grouped = timeEntries
      .filter((t) => t.type !== "debit")
      .reduce<Record<number, { id: number; value: number; label: string }>>(
        (acc, t) => {
          const id = t.consultantID;
          if (!acc[id]) {
            acc[id] = { id, value: 0, label: getConsultantNameByID(id) };
          }
          acc[id].value += parseFloat(t.hours.toFixed(2));
          return acc;
        },
        {}
      );

    return Object.values(grouped);
  }

  return (
    <div ref={parentRef}>
      {variant === "list" ? (
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Flex className="flex flex-row !justify-between items-center p-3 border-b">
            <Link onClick={() => transitionTo(`/project/${project.ID}`)}>
              <Heading className="cursor-pointer !text-sm">
                {project.name}
              </Heading>
            </Link>
            <Token
              color={outOfBudget ? "red" : "green"}
              text={outOfBudget ? "OOB" : "Healthy"}
            />
          </Flex>
        </motion.div>
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
                              projectMeta?.timeEntries ?? [],
                              getConsultantNameByID
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
