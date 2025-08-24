import {
  AlertTriangle,
  FolderCheck,
  Timer,
  TrendingUp,
  Briefcase,
} from "lucide-react";

import useQueryDashboard from "../../state/hooks/useQueryDashboard";
import StatCard from "./StatCard";
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { skeletonDashboardMetrics } from "./config";
import type { DashboardMetrics } from "../../state/hooks/types";
import Gauge from "./Gauge";

const Metrics = () => {
  const { data, isLoading, error } = useQueryDashboard();
  const [metrics, setMetrics] = useState<DashboardMetrics>();

  useEffect(() => {
    if (isLoading) {
      setMetrics(skeletonDashboardMetrics);
    } else {
      if (data) setMetrics(data);
    }
  }, [data, isLoading, error]);

  if (error) return <p className="text-red-500">Error loading dashboard.</p>;
  if (!metrics) return null;

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, Rennie </h1>
      <div className="p-6 space-y-6">
        {/* Big Total Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <StatCard
            icon={<Briefcase />}
            label={`Total Projects (${metrics.projects})`}
            gauge={
              <PieChart
              style={{
                transition:"all 1s ease-in-out"
              }}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: metrics.active,
                        label: "Active Projects",
                      },
                      {
                        id: 1,
                        value: metrics.completed,
                        label: "Completed Projects",
                      },
                      {
                        id: 2,
                        value: metrics.outOfBudget,
                        label: "Out Of Budget",
                      },
                      { id: 3, value: metrics.idle, label: "Idle Projects" },
                      {
                        id: 4,
                        value: metrics.endingSoonCount,
                        label: "Ending Soon",
                      },
                    ],
                  },
                ]}
                width={120}
                height={120}
              />
            }
          />
          <StatCard
            icon={<TrendingUp />}
            label="Active"
            gauge={
              <Gauge
                value={metrics.active}
                maxValue={metrics.projects}
                color="green"
              />
            }
          />
        </div>
        {/* Big Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={<FolderCheck />}
            label="Completed"
            gauge={
              <Gauge
                value={metrics.completed}
                maxValue={metrics.projects}
                color="green"
              />
            }
          />
          <StatCard
            icon={<Timer />}
            label="Idle"
            gauge={
              <Gauge
                value={metrics.idle}
                maxValue={metrics.projects}
                color="danger"
              />
            }
          />
          <StatCard
            icon={<AlertTriangle className="text-red-500" />}
            label="Out of Budget"
            gauge={
              <Gauge
                value={metrics.outOfBudget}
                maxValue={metrics.projects}
                color="danger"
              />
            }
          />
        </div>

        {/* Financials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Asssigned"
            value={`${Math.round(metrics.totalDebit)}hrs`}
          />
          <StatCard
            label="Total Hrs Used"
            value={`${Math.round(metrics.totalCredit)}hrs`}
          />
          <StatCard
            label="Avg Hrs Used"
            value={`${Math.round(parseFloat(metrics.avgCreditOverDebit))}hrs`}
          />
        </div>

        {/* Ending Soon */}
        <StatCard
          className="w-full"
          label="Projects Ending Soon"
          gauge={
            <Gauge
              value={metrics.endingSoonCount}
              maxValue={metrics.projects}
              color="danger"
            />
          }
        />
      </div>
    </>
  );
};

export default Metrics;
