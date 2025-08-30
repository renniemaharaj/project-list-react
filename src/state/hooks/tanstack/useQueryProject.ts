import { useQuery } from "@tanstack/react-query";
import type { ProjectProps } from "../../../pkg/project/types";
import { queryDomains } from "./config";
import { useState } from "react";

// useQueryProject queries domain api for a project by projectID
const useQueryProject = () => {
  // Dynamic setProject hook
  const [projectID, setProjectID] = useState<number>();

  const query = useQuery<ProjectProps>({
    queryKey: ["projects", projectID],
    queryFn: async () => {
      const res = await fetch(`${queryDomains.base}/project/one/${projectID}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      return res.json() as Promise<ProjectProps>;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!projectID,
  });

  return { isLoading:query.isLoading, error:query.error, data:query.data, setProjectID };
};

export default useQueryProject;
