import { Flex, Heading, IconButton } from "@radix-ui/themes";
import useQuerySearch from "../../state/hooks/tanstack/useQuerySearch";
import * as motion from "motion/react-client";
import { Blankslate } from "@primer/react/experimental";
import { SearchIcon, LayoutGrid, StretchHorizontal } from "lucide-react";
import Project from "../../pkg/project";
import { projectDiscoveryPageNumberAtom } from "../../state/app.atoms";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { Button } from "@primer/react";
// import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";

const Discovery = () => {
  const { data, isLoading, error } = useQuerySearch();

  const [renderView, setRenderView] = useState<"list" | "card" | "full">(
    "list"
  );

  const [projectDiscoveryPageNumber, setProjectDiscoveryPageNumber] = useAtom(
    projectDiscoveryPageNumberAtom
  );

  const flexRef = useRef<HTMLDivElement>(null);

  const incrementPage = () => {
    if (flexRef.current)
      flexRef.current.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => setProjectDiscoveryPageNumber((prev) => prev + 1), 600);
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
    <Flex className="flex flex-col gap-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      >
        {/* <Card className="shadow-md"> */}
        {/* <CardContent className="flex flex-row justify-between items-center p-3"> */}
        <Heading className="text-lg font-semibold">
          Results: Page {projectDiscoveryPageNumber + 1}
        </Heading>

        <Flex className="flex w-full !flex-row gap-2 !justify-end items-center">
          {/* View Controls */}
          <IconButton
            size="1"
            aria-label="List View"
            onClick={() => setRenderView("list")}
            disabled={renderView === "list"}
          >
            <LayoutGrid className="w-2 h-2" />
          </IconButton>

          <IconButton
            size="1"
            aria-label="Card View"
            onClick={() => setRenderView("card")}
            disabled={renderView === "card"}
          >
            <LayoutGrid className="w-2 h-2" />
          </IconButton>

          <IconButton
            size="1"
            aria-label="Full View"
            onClick={() => setRenderView("full")}
            // disabled={renderView === "full"}
            disabled
          >
            <StretchHorizontal className="w-2 h-2" />
          </IconButton>

          {/* Pagination Controls */}
          {projectDiscoveryPageNumber > 0 && (
            <Button
              variant="link"
              onClick={() => setProjectDiscoveryPageNumber(0)}
              aria-label="First Page"
            >
              First Page
            </Button>
          )}

          <Button variant="link" onClick={incrementPage} aria-label="Next Page">
            Next Page
          </Button>
        </Flex>
        {/* </CardContent> */}
        {/* </Card> */}
      </motion.div>

      {/* Project Listing */}
      <Flex
        ref={flexRef}
        className={`flex flex-wrap justify-start gap-2 transition-all duration-300 ${
          renderView === "full"
            ? "flex-col"
            : renderView === "card"
            ? "flex-row"
            : "flex-col"
        }`}
      >
        {data.map((projectID) => (
          <Project key={projectID} projectID={projectID} variant={renderView} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Discovery;
