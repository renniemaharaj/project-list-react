import { Flex } from "@radix-ui/themes";
import useQuerySearch from "../../state/hooks/tanstack/useQuerySearch";
import * as motion from "motion/react-client";
import { Blankslate } from "@primer/react/experimental";
import { SearchIcon } from "lucide-react";
import Project from "../../pkg/project";

const Discovery = () => {
  const { data, isLoading, error } = useQuerySearch();

  // Component returns an error text instead of results if error
  if (error) return <p className="text-red-500">Error loading results.</p>;

  // Component returns a loading text instead of results on loading
  if (isLoading)
    return (
      <Blankslate>
        <Blankslate.Visual>
          <SearchIcon />
        </Blankslate.Visual>
        <Blankslate.Heading> Project Query </Blankslate.Heading>
        <Blankslate.Description>
          We're querying projects.
        </Blankslate.Description>
      </Blankslate>
    );

  if (!data)
    return (
      <p className="text-red-500">Something went wrong loading dashboard.</p>
    );

  if (data.length == 0)
    return (
      <p className="text-green-500">No Results. Try editing your query?</p>
    );

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="text-2xl font-bold">{data.length} Results</h1>
      </motion.div>
      <Flex className="flex !flex-row flex-wrap justify-start gap-3">
        {data.map((projectID) => (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Project projectID={projectID} size="sm" />
          </motion.div>
        ))}
      </Flex>
    </>
  );
};

export default Discovery;
