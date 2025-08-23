// state/hooks/useQueryDashboard.ts
import { useQuery } from "@tanstack/react-query";
import type { DashboardMetrics } from "./types";

const fetchURL = "http://localhost:8081/dashboards";

const fetchDashboard = async (): Promise<DashboardMetrics> => {
  const res = await fetch(fetchURL);
  if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
  return res.json();
};

const useQueryDashboard = () => {
  return useQuery<DashboardMetrics>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime: 1000 * 60 * 5,
  });
};

export default useQueryDashboard;
