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
import { Token } from "@primer/react";
import Avatar from "@mui/material/Avatar";
import TimeEntries from "./TimeEntries";

export default function ProjectCard({
  project,
  size = "sm",
}: {
  project: ProjectProps;
  size?: "sm" | "lg";
}) {
  // Use tanstack query for querying project's meta
  const { data, error, isLoading, setProjectID } = useQueryProjectMeta();
  const [projectMeta, setProjectMeta] = useState<ProjectMetaData>();

  useEffect(() => data && setProjectMeta(data), [data]);
  const { theme } = useThemeContext();

  // Track visibility
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  // Calculate accumulated debit
  const debit =
    projectMeta?.timeEntries
      .filter((e) => e.type === "debit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  // Calculate accumuted credit
  const credit =
    projectMeta?.timeEntries
      .filter((e) => e.type === "credit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  // Calculated if out of budget
  const outOfBudget = credit > debit;

  // Get consultant name by consultantID
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
          observer.disconnect(); // stop observing once loaded
        }
      },
      { threshold: 0.1 } // 20% visible triggers load
    );
    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [cardRef]);

  // Trigger meta query only when visible
  useEffect(() => {
    if (inView) setProjectID(project.ID);
  }, [inView, project.ID, setProjectID]);

  // Update state when data arrives
  useEffect(() => {
    if (data) setProjectMeta(data);
  }, [data]);

  return (
    <>
      {size === "lg" && (
        <TimeEntries
          onDelete={() => {}}
          timeEntries={projectMeta?.timeEntries}
          consultants={projectMeta?.consultants}
        />
      )}

      <motion.div
        className={`${size === "lg" ? "!w-full" : "max-w-[22rem]"}`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Card
          ref={cardRef}
          variant="outlined"
          className={`p-4 transition-all w-full ${
            theme === "light" ? "!bg-blue-50" : ""
          }`}
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
                  width={110}
                  height={110}
                  value={credit}
                  valueMax={debit || 1}
                  text={({ value, valueMax }) =>
                    `${parseFloat(value?.toFixed(2) ?? "0")} / ${parseFloat(
                      valueMax.toFixed(2)
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
                        data: projectMeta?.timeEntries
                          ?.filter((timeEntry) => timeEntry.type !== "debit")
                          .map((timeEntry) => ({
                            id: timeEntry.ID,
                            value: parseFloat(timeEntry.hours.toFixed(2)),
                            label: getConsultantNameByID(
                              timeEntry.consultantID
                            ),
                          })),
                      },
                    ]}
                    width={150}
                    height={150}
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

            <ProjectMeta
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
                    />
                  ))}
                </div>
              </>
            )}
          </Flex>
        </Card>
      </motion.div>
    </>
  );
}
