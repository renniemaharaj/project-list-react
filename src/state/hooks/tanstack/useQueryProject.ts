import { useQuery } from "@tanstack/react-query";
import type { ProjectProps } from "../../../pkg/project/types";
import { queryDomains } from "./config";
import { useState } from "react";

const useQueryProject = () => {
  const [projectID, setProjectID] = useState<number>();

  const query = useQuery<ProjectProps>({
    queryKey: ["projects", projectID],
    queryFn: async () => {
      const res = await fetch(`${queryDomains.base}/projects/one/${projectID}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      return res.json() as Promise<ProjectProps>;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!projectID,
  });

  return { query, setProjectID };
};

export default useQueryProject;
