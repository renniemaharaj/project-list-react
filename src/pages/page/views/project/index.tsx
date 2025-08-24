import { useParams } from "react-router-dom";
import ProjectCard from "../../../../pkg/project";
import useQueryProject from "../../../../state/hooks/tanstack/useQueryProject";
import { useCallback, useEffect } from "react";

const Project = () => {
  const { projectID } = useParams();
  const { query, setProjectID } = useQueryProject();

  const setProjectIDCallback = useCallback(
    (ID: number) => {
      setProjectID(ID);
    },
    [setProjectID]
  );

  useEffect(() => {
    // Parse projectID first
    const parsedID = Number(projectID);
    setProjectIDCallback(parsedID);
  }, [projectID, setProjectIDCallback]);

  // Parse projectID first
  const parsedID = Number(projectID);
  if (!projectID || isNaN(parsedID) || parsedID <= 0) {
    return <p className="text-red-500">Invalid project ID in URL.</p>;
  }

  if (query.isLoading) {
    return <p className="text-gray-500">Loading project...</p>;
  }

  if (query.error) {
    return <p className="text-red-500">Could not fetch project.</p>;
  }

  if (query.data) return <ProjectCard size="lg" project={query.data} />;

  return <p className="text-red-500">Unexpected error loading project.</p>;
};

export default Project;
