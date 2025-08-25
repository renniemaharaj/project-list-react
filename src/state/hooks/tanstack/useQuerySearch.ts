import { useQuery } from "@tanstack/react-query";
import { queryDomains } from "./config";
import { useParams } from "react-router-dom";

// useQuerySearch queries domain api for projects using pagination
const useQuerySearch = () => {
  // pagination is handled through a jotai atom
  const domainSearchQuery  = useParams().searchQuery
  const query = useQuery<number[]>({
    queryKey: ["projects", domainSearchQuery],
    queryFn: async () => {
      const res = await fetch(
        `${queryDomains.base}/projects/search/${domainSearchQuery}`
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json() as Promise<number[]>;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data: query.data, error: query.error, isLoading: query.isLoading };
};

export default useQuerySearch;
