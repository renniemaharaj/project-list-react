import { useQuery } from "@tanstack/react-query";
import { queryDomains } from "./config";
import { useAtomValue } from "jotai";
import { projectExplorerPageNumberAtom } from "../../app.atoms";

// useQueryProjects queries domain api for projects using pagination
const useQueryProjects = () => {
  // pagination is handled through a jotai atom
  const projectExplorerPageNumber = useAtomValue(projectExplorerPageNumberAtom);
  const query = useQuery<number[]>({
    queryKey: ["projects", projectExplorerPageNumber],
    queryFn: async () => {
      const res = await fetch(
        `${queryDomains.base}/project/page/${projectExplorerPageNumber}`
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json() as Promise<number[]>;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data: query.data, error: query.error, isLoading: query.isLoading };
};

export default useQueryProjects;
