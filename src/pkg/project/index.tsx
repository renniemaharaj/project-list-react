import { useEffect } from "react";
import useQueryProject from "../../state/hooks/tanstack/useQueryProject";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import ProjectRow from "./ProjectRow";

const Project = ({
  projectID,
  variant,
}: {
  projectID: number;
  variant: "list" | "card" | "full";
}) => {
  const { isLoading, error, data, setProjectID } = useQueryProject();

  // Hook must be rendered before
  useEffect(() => setProjectID(projectID), [projectID, setProjectID]);

  // Silently return if projectID is not truthy
  if (!projectID) return;

  // if (isLoading) return <p className="text-green-500">Getting project data.</p>;
  if (isLoading) return <ProjectSkeleton />;

  // Component returns an error text instead of dashboard if error
  // Component returns an error text instead of dashboard if error
  if (error || !data) return <p className="text-red-500">Error getting project data.</p>;

  // If variant === list then return a html table row element
  if (variant === "list") return <ProjectRow project={data} />;

  // Other return a project card with variant passed
  return <ProjectCard project={data} variant={variant} />;
};

export default Project;
