import { LineChart } from "@mui/x-charts";
import type { Consultant, TimeEntry } from "./types";

type Props = {
  timeEntries: TimeEntry[];
  consultants: Consultant[];
};

const TimeEntriesLineChart = ({ timeEntries, consultants }: Props) => {
  const getConsultantName = (id: number) =>
    consultants.find((c) => c.ID === id)?.firstName ?? `Consultant ${id}`;

  // Sort entries by date
  const sortedEntries = [...timeEntries].sort(
    (a, b) => a.entryDate - b.entryDate
  );

  // Collect unique dates
  const uniqueDates = Array.from(
    new Set(sortedEntries.map((e) => new Date(e.entryDate).toDateString()))
  );

  // Group entries by consultantID
  const entriesByConsultant = sortedEntries.reduce<
    Record<number, Record<string, TimeEntry>>
  >((acc, entry) => {
    const dateKey = new Date(entry.entryDate).toDateString();
    if (!acc[entry.consultantID]) acc[entry.consultantID] = {};
    acc[entry.consultantID][dateKey] = entry;
    return acc;
  }, {});

  // Build series with zeros for missing dates
  const consultantSeries = Object.entries(entriesByConsultant).map(
    ([consultantID, entries]) => {
      const data = uniqueDates.map((date) => {
        const entry = entries[date];
        if (!entry) return 0;
        return entry.type === "debit" ? entry.hours : -entry.hours;
      });

      return {
        id: Number(consultantID),
        label: getConsultantName(Number(consultantID)),
        data,
      };
    }
  );

  // Filter out dates where *all consultants are 0*
  const activeIndexes = uniqueDates
    .map((_, i) =>
      consultantSeries.some((s) => s.data[i] !== 0) ? i : null
    )
    .filter((i): i is number => i !== null);

  const activeDates = activeIndexes.map((i) => uniqueDates[i]);
  const filteredSeries = consultantSeries.map((s) => ({
    ...s,
    data: activeIndexes.map((i) => s.data[i]),
  }));

  return (
    <LineChart
      xAxis={[{ data: activeDates, scaleType: "band", label: "Date" }]}
      series={filteredSeries}
      height={300}
      margin={{ bottom: 40, left: 60, right: 20 }}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "top", horizontal: "center" },
        },
      }}
    />
  );
};

export default TimeEntriesLineChart;
