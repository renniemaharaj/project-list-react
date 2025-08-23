import { Box, Flex } from "@radix-ui/themes";
import { BookIcon } from "lucide-react";
import useQueryProjects from "../../../state/hooks/useQueryProjects";
import { Blankslate, SkeletonText } from "@primer/react/experimental";
import Project from "../../../pkg/project";
import type { ProjectProps } from "../../../pkg/project/types";

const SidePane = () => {
  const { data, isLoading, error } = useQueryProjects();

  // Loading state with skeletons
  if (isLoading) {
    return (
      <>
        <Blankslate>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading> Project Explorer </Blankslate.Heading>
          <Blankslate.Description>
            We're getting projects, hang tight.
          </Blankslate.Description>
        </Blankslate>
        <SkeletonText lines={3} />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Blankslate>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading> Project Explorer </Blankslate.Heading>
          <Blankslate.Description>
            An error was encountered while fetching projects.
          </Blankslate.Description>
          <Blankslate.PrimaryAction href="/">Refresh</Blankslate.PrimaryAction>
        </Blankslate>
      </>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <>
        <Blankslate>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading> Project Explorer </Blankslate.Heading>
          <Blankslate.Description>
            No projects were found. Create one?
          </Blankslate.Description>
          <Blankslate.PrimaryAction href="/create">
            New Project
          </Blankslate.PrimaryAction>
        </Blankslate>
      </>
    );
  }

  // Success state
  return (
    <>
      <Blankslate>
        <Blankslate.Visual>
          <BookIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading> Project Explorer </Blankslate.Heading>
        <Blankslate.Description>
          Are you ready to start a new project?
        </Blankslate.Description>
        <Blankslate.PrimaryAction href="/create">
          New Project
        </Blankslate.PrimaryAction>
      </Blankslate>
      <Flex className="flex flex-col !gap-2">
        {(data as ProjectProps[]).map((project: ProjectProps, i) => (
          <Box key={i + "project-list"}>
            <Project project={project} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default SidePane;
