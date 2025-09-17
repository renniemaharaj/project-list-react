// The defined dashboard metrics type
export type DashboardMetrics = {
  projects: number;
  active: number;
  completed: number;
  idle: number;
  outOfBudget: number;
  totalDebit: number;
  totalCredit: number;
  avgCreditOverDebit: number;
  endingSoonCount: number;
};

export type StatActionButton = {
  title: string;
  action: () => void;
};
