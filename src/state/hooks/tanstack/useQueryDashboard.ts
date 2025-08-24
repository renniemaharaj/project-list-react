// state/hooks/useQueryDashboard.ts
import { useQuery } from "@tanstack/react-query";
import type { DashboardMetrics } from "../../../pkg/dashboard/types";
import { queryDomains } from "./config";

const useQueryDashboard = () => {
  const query = useQuery<DashboardMetrics>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch(`${queryDomains.base}/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch project");
      return res.json() as Promise<DashboardMetrics>;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { query };
};

export default useQueryDashboard;
