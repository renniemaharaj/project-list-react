import { useParams } from "react-router-dom";
import useGetProject from "../../../../state/hooks/useGetProject";
import ProjectCard from "../../../../pkg/project";
import type { ProjectProps } from "../../../../pkg/project/types";

const Project = () => {
  const { projectID } = useParams();
  const { getProjectByID } = useGetProject();

  // Parse projectID first
  const parsedID = Number(projectID);
  if (!projectID || isNaN(parsedID) || parsedID <= 0) {
    return <p className="text-red-500">Invalid project ID in URL.</p>;
  }

  const projectInURL = getProjectByID(parsedID);

  if (projectInURL === 0) {
    return <p className="text-gray-500">Loading project...</p>;
  }

  if (projectInURL === 1) {
    return <p className="text-red-500">Could not fetch project.</p>;
  }

  if (typeof projectInURL === "object") {
    return <ProjectCard size="lg" project={projectInURL as ProjectProps} />;
  }

  return <p className="text-red-500">Unexpected error loading project.</p>;
};

export default Project;
