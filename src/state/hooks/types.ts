// The defined dashboard metrics type
export type DashboardMetrics = {
  projects: number;
  active: number;
  completed: number;
  idle: number;
  outOfBudget: number;
  totalDebit: number;
  totalCredit: number;
  avgCreditOverDebit: string; // or number if backend doesn’t stringify
  endingSoonCount: number;
};
