import type { DashboardMetrics } from "./types";

// A nil dashboard for skeleton
export const skeletonDashboardMetrics: DashboardMetrics = {
  projects: 0,
  active: 0,
  completed: 0,
  idle: 0,
  totalDebit: 0,
  totalCredit: 0,
  outOfBudget: 0,
  avgCreditOverDebit: 0,
  endingSoonCount: 0,
};
