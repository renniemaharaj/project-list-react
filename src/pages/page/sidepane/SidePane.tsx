import { Box, Flex } from "@radix-ui/themes";
import { BookIcon } from "lucide-react";
import useQueryProjects from "../../../state/hooks/tanstack/useQueryProjects";
import { Blankslate, SkeletonText } from "@primer/react/experimental";
import Project from "../../../pkg/project";
import type { ProjectProps } from "../../../pkg/project/types";
import { projectExplorerPageNumberAtom } from "../../../state/app.atoms";
import * as motion from "motion/react-client";
import { useAtom } from "jotai";

const SidePane = () => {
  const { isLoading, error, data } = useQueryProjects();

  const [projectExplorerPageNumber, setProjectExplorerPageNumber] = useAtom(
    projectExplorerPageNumberAtom
  );

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
  if (!data || data?.length === 0) {
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

          {projectExplorerPageNumber > 0 ? (
            <Blankslate.PrimaryAction
              onClick={() => setProjectExplorerPageNumber(0)}
            >
              First Page
            </Blankslate.PrimaryAction>
          ) : (
            <Blankslate.PrimaryAction href="/create">
              New Project
            </Blankslate.PrimaryAction>
          )}
        </Blankslate>
      </>
    );
  }

  // Success state
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }} // start below and hidden
        animate={{ y: 0, opacity: 1 }} // move up into place
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Blankslate>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>
            {" "}
            {`Project Explorer Page ${projectExplorerPageNumber + 1}`}{" "}
          </Blankslate.Heading>
          <Blankslate.Description>
            Are you ready to start a new project?
          </Blankslate.Description>
          <Blankslate.PrimaryAction href="/create">
            New Project
          </Blankslate.PrimaryAction>
        </Blankslate>
        <Flex className="flex max-h-full flex-col !gap-2">
          {data?.map((project: ProjectProps, i) => (
            <Box key={i + "project-list"}>
              <Project project={project} />
            </Box>
          ))}
        </Flex>
      </motion.div>
    </>
  );
};

export default SidePane;
