import { useQuery } from "@tanstack/react-query";
import type { ProjectMetaData } from "../../../pkg/project/types";
import { queryDomains } from "./config";
import { useState } from "react";

// useQueryProjectMeta queries domain api for extended project meta data
const useQueryProjectMeta = () => {
  // Dynamic setProjectID
  const [ProjectID, setProjectID] = useState<number>();

  const query = useQuery<ProjectMetaData>({
    queryKey: ["projectMeta", ProjectID],
    queryFn: async () => {
      const res = await fetch(
        `${queryDomains.base}/projects/meta/${ProjectID}`
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json() as Promise<ProjectMetaData>;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!ProjectID,
  });

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    setProjectID,
  };
};

export default useQueryProjectMeta;
