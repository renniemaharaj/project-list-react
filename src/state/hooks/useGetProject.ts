import { useCallback } from "react";
import useQueryProjects from "./useQueryProjects";
import type { ProjectProps } from "../../pkg/project/types";

const useGetProject = () => {
  const { data, isLoading, error } = useQueryProjects();

  const getProjectByID = useCallback(
    (projectID: number): ProjectProps | number => {
      if (isLoading) return 0;
      if (error) return 1;
      if (data) {
        const proj = data.filter((project) => project.ID === projectID);
        if (proj.length >= 1) return proj[0];
      }
      return 1;
    },
    [data, isLoading, error]
  );
  return {getProjectByID};
};

export default useGetProject;
