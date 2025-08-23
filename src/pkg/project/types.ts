export type ProjectProps = {
  id: number;
  projectedStartDate: number;
  startDate: number;
  projectedEndDate: number;
  endDate: number;
  number: number;
  name: string;
  managerId: number;
  description: string;
};

export type Status = {
  id: number;
  title: string;
  description: string;
  projectId: number;
  consultantID: number;
  dateCreated: number;
};

export type TimeEntry = {
  id: number;
  title: string;
  description: string;
  projectId: number;
  consultantID: number;
  dateCreated: number;
  hours: number;
  type: string; // Debit or Credit
  entryDate: number; // when it was logged
};

export type Consultant = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // Roles          []string `json:"roles"` // stored in separate table
  profilePicture: string;
};

export type ProjectMetaData = {
  manager: Consultant;
  timeEntries: TimeEntry[];
  statusHistory: Status[];
  consultants: Consultant[];
};
