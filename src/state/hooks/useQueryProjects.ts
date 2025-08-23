import { useQuery } from '@tanstack/react-query';

const fetchURL = "http://localhost:8081/projects";

const fetchProjects = async () => {
  const res = await fetch(fetchURL);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
};

const useQueryProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
  });
};

export default useQueryProjects;
