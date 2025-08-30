import { Flex, Heading} from "@radix-ui/themes";
import useQuerySearch from "../../state/hooks/tanstack/useQuerySearch";
import * as motion from "motion/react-client";
import { Blankslate } from "@primer/react/experimental";
import { SearchIcon, LayoutGrid, StretchHorizontal } from "lucide-react";
import Project from "../../pkg/project";
import { projectDiscoveryPageNumberAtom } from "../../state/app.atoms";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { Button } from "@primer/react";

const Discovery = () => {
  const { data, isLoading, error } = useQuerySearch();

  const [renderView, setRenderView] = useState<"default" | "full-w">("default");

  const [projectDiscoveryPageNumber, setProjectDiscoveryPageNumber] = useAtom(
    projectDiscoveryPageNumberAtom
  );

  const flexRef = useRef<HTMLDivElement>(null);

  const incrementPage = () => {
    if (flexRef.current)
      flexRef.current.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => setProjectDiscoveryPageNumber((prev) => prev + 1), 1000);
  };

  if (error) return <p className="text-red-500">Error loading results.</p>;

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

          <Flex className="flex flex-row gap-1 items-center">
            {/* View Controls */}
            <Button
              // size="1"
              // variant="soft"
              size="small"
              aria-label="Default View"
              onClick={() => setRenderView("default")}
              disabled={renderView === "default"}
            >
              <LayoutGrid className="!w-2 !h-2"/>
            </Button>

            <Button
              // size="1"
              // variant="soft"
              size="small"
              aria-label="Full Width View"
              onClick={() => setRenderView("full-w")}
              disabled={renderView === "full-w"}
            >
              <StretchHorizontal  className="!w-2 !h-2" />
            </Button>

            {/* Pagination Controls */}
            {projectDiscoveryPageNumber > 0 && (
              <Button
                // size="small"
                variant="link"
                className="holographic-card"
                onClick={() => setProjectDiscoveryPageNumber(0)}
                aria-label={"First Page"}
              >
                First Page
              </Button>
            )}

            <Button
              // size=""
              variant="link"
              className="holographic-card"
              onClick={incrementPage}
              aria-label={"Next Page"}
            >
              Next Page
            </Button>
          </Flex>
        </Flex>
      </motion.div>

      {/* Project Listing */}
      <Flex
        ref={flexRef}
        className={`flex flex-row flex-wrap justify-start gap-2 transition-all duration-300 ${
          renderView === "full-w" ? "!flex-col" : "!flex-row"
        }`}
      >
        {data.map((projectID) => (
          <Project
            key={projectID}
            projectID={projectID}
            detailed={renderView==="full-w"}
            size={renderView === "full-w" ? "lg" : "sm"}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Discovery;
