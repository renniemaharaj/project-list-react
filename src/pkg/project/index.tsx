import { useEffect } from "react";
import useQueryProject from "../../state/hooks/tanstack/useQueryProject";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";

const Project = ({
  projectID,
  variant,
}: {
  projectID: number;
  variant: "list" | "card" | "full";
}) => {
  const { isLoading, error, data, setProjectID } = useQueryProject();

  useEffect(() => setProjectID(projectID), [projectID, setProjectID]);
  
  // Silently return if projectID is not truthy
  if (!projectID)return
  
  // Component returns an error text instead of dashboard if error
  // if (isLoading) return <p className="text-green-500">Getting project data.</p>;
  if (isLoading) return <ProjectSkeleton/>;


  // Component returns an error text instead of dashboard if error
  if (error) return <p className="text-red-500">Error getting project data.</p>;

  // Component returns an error text instead of dashboard if error
  if (!data) return <p className="text-red-500">Error getting project data.</p>;

  return <ProjectCard project={data} variant={variant} />;
};

export default Project;
