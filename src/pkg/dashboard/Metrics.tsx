import {
  AlertTriangle,
  FolderCheck,
  Timer,
  TrendingUp,
  Briefcase,
} from "lucide-react";

import useQueryDashboard from "../../state/hooks/useQueryDashboard";
import StatCard from "./StatCard";
import { Gauge, PieChart } from "@mui/x-charts";
import AnimatedNumber from "../animatedNumber";
import { useEffect, useState } from "react";
import { skeletonDashboardMetrics } from "./config";
import type { DashboardMetrics } from "../../state/hooks/types";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            icon={<Briefcase />}
            label="Total Projects"
            value={
              <>
                <PieChart
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
                        { id: 2, value: metrics.idle, label: "Out Of Budget" },
                        {
                          id: 3,
                          value: metrics.outOfBudget,
                          label: "Out Of Budget",
                        },
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
                <AnimatedNumber
                  number={metrics.projects}
                  fontStyle={{ fontSize: 30 }}
                />{" "}
                Projects
              </>
            }
          />
          <StatCard
            icon={<TrendingUp />}
            label="Active"
            value={
              <Gauge
                width={100}
                height={100}
                value={metrics.active}
                valueMax={metrics.projects}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
            }
          />
        </div>
        {/* Big Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<FolderCheck />}
            label="Completed"
            value={
              <Gauge
                width={100}
                height={100}
                value={metrics.completed}
                valueMax={metrics.projects}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
            }
          />
          <StatCard
            icon={<Timer />}
            label="Idle"
            value={
              <Gauge
                width={100}
                height={100}
                value={metrics.idle}
                valueMax={metrics.projects}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
            }
          />
          <StatCard
            icon={<AlertTriangle className="text-red-500" />}
            label="Out of Budget"
            value={
              <Gauge
                width={100}
                height={100}
                value={metrics.outOfBudget}
                valueMax={metrics.projects}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
            }
          />
        </div>

        {/* Financials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Asssigned"
            value={`${metrics.totalDebit}hrs`}
          />
          <StatCard
            label="Total Hrs Used"
            value={`${metrics.totalCredit}hrs`}
          />
          <StatCard
            label="Avg Hrs Used"
            value={`${metrics.avgCreditOverDebit}hrs`}
          />
        </div>

        {/* Ending Soon */}
        <StatCard
          className="w-full"
          label="Projects Ending Soon"
          value={
            <Gauge
              width={100}
              height={100}
              value={metrics.endingSoonCount}
              valueMax={metrics.projects}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          }
        />
      </div>
    </>
  );
};

export default Metrics;
