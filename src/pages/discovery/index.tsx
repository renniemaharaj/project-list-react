import * as motion from "motion/react-client";
import useQuerySearch from "../../state/hooks/tanstack/useQuerySearch";
import { Blankslate } from "@primer/react/experimental";
import { SearchIcon } from "lucide-react";
import ProjectResults from "../../pkg/project/ProjectResults";
import { projectDiscoveryPageNumberAtom } from "../../state/app.atoms";
import { useAtom } from "jotai";

const Discovery = () => {
  const { data, isLoading, error } = useQuerySearch();

  const [projectDiscoveryPageNumber, setProjectDiscoveryPageNumber] = useAtom(
    projectDiscoveryPageNumberAtom
  );

  const incrementPage = () => {
    setTimeout(() => setProjectDiscoveryPageNumber((prev) => prev + 1), 600);
  };

  const decrementPage = () => {
    setTimeout(() => setProjectDiscoveryPageNumber((prev) => prev - 1), 600);
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

  if (data.length === 0)
    return (
      <p>
        No results for this page or query. Try{" "}
        <a href={location.href} className="underline text-blue-600">
          resetting your query?
        </a>
      </p>
    );

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <ProjectResults
        data={data}
        onPagePrevious={
          projectDiscoveryPageNumber > 0 ? decrementPage : undefined
        }
        onPageForward={data.length > 0 ? incrementPage : undefined}
      />
    </motion.div>
  );
};

export default Discovery;
