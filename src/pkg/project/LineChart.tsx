import { LineChart } from "@mui/x-charts";
import type { Consultant, TimeEntry } from "./types";

type Props = {
  timeEntries: TimeEntry[];
  consultants: Consultant[];
};

const TimeEntriesLineChart = ({ timeEntries, consultants }: Props) => {
  // Helper to map consultantID → consultant name
  const getConsultantName = (id: number) =>
    consultants.find((c) => c.ID === id)?.firstName ?? `Consultant ${id}`;

  // Sort entries by date to ensure timeline order
  const sortedEntries = [...timeEntries].sort(
    (a, b) => a.entryDate - b.entryDate
  );

  // Extract unique dates
  const uniqueDates = Array.from(
    new Set(
      sortedEntries.map((e) => new Date(e.entryDate).toLocaleDateString())
    )
  );

  // Group time entries by consultant
  const consultantSeries = consultants.map((consultant) => {
    const seriesData = uniqueDates.map((date) => {
      const entry = sortedEntries.find(
        (e) =>
          e.consultantID === consultant.ID &&
          new Date(e.entryDate).toLocaleDateString() === date
      );

      // Debit = positive hours, Credit = negative hours
      if (entry) {
        return entry.type === "debit" ? entry.hours : -entry.hours;
      }
      return null; // No data for this date
    });

    return {
      id: consultant.ID,
      label: getConsultantName(consultant.ID),
      data: seriesData,
    };
  });

  return (
    <LineChart
      xAxis={[{ data: uniqueDates, scaleType: "band", label: "Date" }]}
      series={consultantSeries}
      height={300}
      margin={{ bottom: 40, left: 60, right: 20 }}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "top", horizontal: "center" },
        //   padding: 5,
        },
      }}
    />
  );
};

export default TimeEntriesLineChart;
