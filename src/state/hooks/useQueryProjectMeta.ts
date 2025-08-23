import { useQuery } from '@tanstack/react-query';

const fetchURL = "http://localhost:8081/projects";

const fetchProjects = async ({ queryKey }: { queryKey: [string, number] }) => {
  const [, projectID] = queryKey;
  const res = await fetch(`${fetchURL}/byID/${projectID}/meta`);
  if (!res.ok) {
    throw new Error("Failed to fetch project meta");
  }
  return res.json();
};

const useQueryProjectMeta = ({ projectID }: { projectID: number }) => {
  return useQuery({
    queryKey: ["projectMeta", projectID],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
  });
};

export default useQueryProjectMeta;
