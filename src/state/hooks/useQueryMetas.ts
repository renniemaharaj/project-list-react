import { useQuery } from '@tanstack/react-query';
import type { ProjectMetaData } from '../../pkg/project/types';

const fetchURL = "http://localhost:8081/projects/metas";

const fetchMetas = async () => {
  const res = await fetch(fetchURL);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
};

const useQueryMetas = () => {
  return useQuery<ProjectMetaData[]>({
    queryKey: ["projectMetas"],
    queryFn: fetchMetas,
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
  });
};

export default useQueryMetas;
