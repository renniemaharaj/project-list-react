export type ProjectProps = {
  ID: number;
  projectedStartDate: number;
  startDate: number;
  projectedEndDate: number;
  endDate: number;
  number: number;
  name: string;
  managerID: number;
  description: string;
};

export type Status = {
  ID: number;
  title: string;
  description: string;
  projectID: number;
  consultantID: number;
  dateCreated: number;
};

export type TimeEntry = {
  ID: number;
  title: string;
  description: string;
  projectID: number;
  consultantID: number;
  dateCreated: number;
  hours: number;
  type: string; // Debit or Credit
  entryDate: number; // when it was logged
};

export type Consultant = {
  ID: number;
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
