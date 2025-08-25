import Gauge from "./Gauge";
import StatCard from "./StatCard";
import {
  AlertTriangle,
  Briefcase,
  FolderCheck,
  Timer,
  TrendingUp,
} from "lucide-react";
import { PieChart } from "@mui/x-charts";
import type { DashboardMetrics } from "./types";
import * as motion from "motion/react-client";

const DashboardComp = ({ dashboard }: { dashboard: DashboardMetrics }) => {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="text-2xl font-bold">Hello, Rennie </h1>
      </motion.div>
      <div className="p-6 space-y-6">
        {/* Big Total Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <StatCard
            icon={<Briefcase />}
            label={`Total Projects (${dashboard.projects})`}
            gauge={
              <PieChart
                style={{
                  transition: "all 1s ease-in-out",
                }}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: dashboard.active,
                        label: "Active Projects",
                      },
                      {
                        id: 1,
                        value: dashboard.completed,
                        label: "Completed Projects",
                      },
                      {
                        id: 2,
                        value: dashboard.outOfBudget,
                        label: "Out Of Budget",
                      },
                      { id: 3, value: dashboard.idle, label: "Idle Projects" },
                      {
                        id: 4,
                        value: dashboard.endingSoonCount,
                        label: "Ending Soon",
                      },
                    ],
                  },
                ]}
                width={130}
                height={130}
              />
            }
          />
          <StatCard
            icon={<TrendingUp />}
            label="Active"
            gauge={
              <Gauge
                value={dashboard.active}
                maxValue={dashboard.projects}
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
                value={dashboard.completed}
                maxValue={dashboard.projects}
                color="green"
              />
            }
          />
          <StatCard
            icon={<Timer />}
            label="Idle"
            gauge={
              <Gauge
                value={dashboard.idle}
                maxValue={dashboard.projects}
                color="danger"
              />
            }
          />
          <StatCard
            icon={<AlertTriangle className="text-red-500" />}
            label="Out of Budget"
            gauge={
              <Gauge
                value={dashboard.outOfBudget}
                maxValue={dashboard.projects}
                color="danger"
              />
            }
          />
        </div>

        {/* Financials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Asssigned"
            value={`${parseFloat(dashboard.totalDebit.toFixed(2))}hrs`}
          />
          <StatCard
            label="Total Hrs Used"
            value={`${parseFloat(dashboard.totalCredit.toFixed(2))}hrs`}
          />
          <StatCard
            label="Avg Hrs Used"
            value={`${Math.round(dashboard.avgCreditOverDebit)}hrs`}
          />
        </div>

        {/* Ending Soon */}
        <StatCard
          className="w-full"
          label="Projects Ending Soon"
          gauge={
            <Gauge
              value={dashboard.endingSoonCount}
              maxValue={dashboard.projects}
              color="danger"
            />
          }
        />
      </div>
    </>
  );
};

export default DashboardComp;
