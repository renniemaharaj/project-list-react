import { Flex, Heading } from "@radix-ui/themes";
import useQuerySearch from "../../state/hooks/tanstack/useQuerySearch";
import * as motion from "motion/react-client";
import { Blankslate } from "@primer/react/experimental";
import { SearchIcon } from "lucide-react";
import Project from "../../pkg/project";
import { projectDiscoveryPageNumberAtom } from "../../state/app.atoms";
import { useAtom } from "jotai";
import { useRef } from "react";
import { Button } from "@primer/react";

const Discovery = () => {
  const { data, isLoading, error } = useQuerySearch();

  const [projectDiscoveryPageNumber, setProjectDiscoveryPageNumber] = useAtom(
    projectDiscoveryPageNumberAtom
  );

  // const { theme } = useThemeContext();
  const flexRef = useRef<HTMLDivElement>(null);

  const incrementPage = () => {
    // Animate scroll up
    if (flexRef.current)
      flexRef.current.scrollTo({ top: 0, behavior: "smooth" });

    // Only after increment
    setTimeout(() => setProjectDiscoveryPageNumber((prev) => prev + 1), 1000);
  };
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
    <Flex className="flex flex-col gap-2">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Flex className="flex flex-row gap-1 !w-full justify-between !items-center">
          <Heading className="text-xl font-semibold">
            {data.length} Results: Page ({projectDiscoveryPageNumber + 1})
          </Heading>
          <Flex className="flex flex-1 flex-row gap-1 !w-fit items-center justify-end">
            {projectDiscoveryPageNumber > 0 && (
              <Button
                size="small"
                // variant="invisible"
                variant="link"
                className="holographic-card w-full"
                onClick={() => setProjectDiscoveryPageNumber(0)}
                aria-label={"First Page"}
              >
                First Page
              </Button>
            )}

            <Button
              size="small"
              // variant="invisible"
              variant="link"
              className="holographic-card w-full"
              onClick={incrementPage}
              aria-label={"Next Page"}
            >
              Next Page
            </Button>
          </Flex>
        </Flex>
        {/* </Card> */}
      </motion.div>
      <Flex
        ref={flexRef}
        className="flex !flex-row flex-wrap justify-start gap-2"
      >
        {data.map((projectID) => (
          <Project projectID={projectID} size="sm" />
        ))}
      </Flex>
    </Flex>
  );
};

export default Discovery;
