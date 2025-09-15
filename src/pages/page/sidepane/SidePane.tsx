import { Box, Flex } from "@radix-ui/themes";
import { BookIcon } from "lucide-react";
import useQueryProjects from "../../../state/hooks/tanstack/useQueryProjects";
import { Blankslate, SkeletonText } from "@primer/react/experimental";
import Project from "../../../pkg/project";
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
    );
  }

  // Empty state
  if (!data || data?.length === 0) {
    return (
      <Blankslate>
        <Blankslate.Visual>
          <BookIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading> Project Explorer </Blankslate.Heading>
        <Blankslate.Description>
          There are no projects to display for this page.
        </Blankslate.Description>

        {projectExplorerPageNumber > 0 ? (
          <Blankslate.PrimaryAction
            onClick={() => setProjectExplorerPageNumber(0)}
          >
            Go Back
          </Blankslate.PrimaryAction>
        ) : (
          <Blankslate.PrimaryAction href="/create">
            New Project
          </Blankslate.PrimaryAction>
        )}
      </Blankslate>
    );
  }

  // Success state
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Flex className="flex max-h-full flex-col !gap-2">
        {data?.map((projectID: number, i) => (
          <Box key={i + "project-list"}>
            <Project projectID={projectID} variant="list"/>
          </Box>
        ))}
      </Flex>
    </motion.div>
  );
};

export default SidePane;
