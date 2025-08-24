import { useQuery } from "@tanstack/react-query";
import type { ProjectProps } from "../../../pkg/project/types";
import { queryDomains } from "./config";
import { useAtomValue } from "jotai";
import { projectExplorerPageNumberAtom } from "../../app.atoms";

const useQueryProjects = () => {
  const projectExplorerPageNumber = useAtomValue(projectExplorerPageNumberAtom);
  const query = useQuery<ProjectProps[]>({
    queryKey: ["projects", projectExplorerPageNumber],
    queryFn: async () => {
      const res = await fetch(
        `${queryDomains.base}/projects/all/page/${projectExplorerPageNumber}`
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json() as Promise<ProjectProps[]>;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data: query.data, error: query.error, isLoading: query.isLoading };
};

export default useQueryProjects;
