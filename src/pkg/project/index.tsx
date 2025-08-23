import { Avatar, Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { ProjectMetaData, ProjectProps } from "./types";
import { Spinner } from "@radix-ui/themes";
import useQueryProjectMeta from "../../state/hooks/useQueryProjectMeta";
import { Gauge } from "@mui/x-charts/Gauge";
import { differenceInDays } from "date-fns";
import Meta from "./Meta";
import useThemeContext from "../../hooks/theme/useThemeContext";

export default function ProjectCard({ project }: { project: ProjectProps }) {
  const {
    data: projectMeta,
    isLoading,
    error,
  } = useQueryProjectMeta({
    projectID: project.id,
  });

  const {theme} = useThemeContext()

  const debit =
    (projectMeta as ProjectMetaData)?.timeEntries
      .filter((e) => e.type === "debit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  const credit =
    (projectMeta as ProjectMetaData)?.timeEntries
      .filter((e) => e.type === "credit")
      .reduce((acc, e) => acc + e.hours, 0) ?? 0;

  const outOfBudget = credit > debit;

  // Check if recently updated (within a week)
  const recent =
    projectMeta &&
    differenceInDays(
      new Date(),
      new Date(projectMeta.manager?.updatedAt ?? Date.now())
    ) <= 7;

  return (
    <Card
      className={`p-4 cursor-pointer shadow-md hover:shadow-lg transition-all w-full max-w-lg ${
        recent ? "" : "border-2 border-red-400"
      } ${theme === "light" ? "bg-blue-50":""}`}
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
              <span className="text-sm font-medium text-blue-600">Debit</span>
              <span className="text-lg font-semibold">{debit}h</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-purple-600">
                Credit
              </span>
              <span
                className={`text-lg font-semibold ${
                  credit > debit && "!text-red-500"
                }`}
              >
                {credit}h
              </span>
            </div>
          </div>
          <Gauge
            width={100}
            height={100}
            value={credit}
            valueMax={debit || 1}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </Flex>

        <Text size="2" className="text-sm text-gray-600">
          <span>
            <strong>Description</strong>
            <br /> {project.description}
          </span>
        </Text>

        <Meta project={project} projectMeta={projectMeta as ProjectMetaData} />

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
              {(projectMeta as ProjectMetaData)?.consultants?.map((c) => (
                <Avatar
                  key={c.id}
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
  );
}
