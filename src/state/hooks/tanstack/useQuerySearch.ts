import { useQuery } from "@tanstack/react-query";
import { queryDomains } from "./config";
import { useParams } from "react-router-dom";
import { projectDiscoveryPageNumberAtom } from "../../app.atoms";
import { useAtomValue } from "jotai";

// useQuerySearch queries domain api for projects using pagination
const useQuerySearch = () => {
  // pagination is handled through a jotai atom
  const projectDiscoveryPageNumber = useAtomValue(projectDiscoveryPageNumberAtom);
  const domainSearchQuery  = useParams().searchQuery
  const query = useQuery<number[]>({
    queryKey: ["projects", domainSearchQuery, projectDiscoveryPageNumber],
    queryFn: async () => {
      const res = await fetch(
        `${queryDomains.base}/project/search/${domainSearchQuery}/page/${projectDiscoveryPageNumber}`
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json() as Promise<number[]>;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data: query.data, error: query.error, isLoading: query.isLoading };
};

export default useQuerySearch;
