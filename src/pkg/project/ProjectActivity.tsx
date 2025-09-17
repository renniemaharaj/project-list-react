import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  SparkLineChart,
  type SparkLineChartProps,
} from "@mui/x-charts/SparkLineChart";
import {
  areaElementClasses,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import type { ProjectMetaData } from "./types";
import { format } from "date-fns";
import React from "react";
import { Separator } from "@radix-ui/themes";

interface ProjectActivitySparklineProps {
  projectMeta: ProjectMetaData;
}

type TimelinePoint = {
  date: string;
  delta: number; // +hrs or -hrs (0 if only status)
  balance: number; // running total
  status?: string;
};

export default function ProjectActivitySparkline({
  projectMeta,
}: ProjectActivitySparklineProps) {
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(
    null
  );

  // Build timeline data
  const allDates = new Set<string>();
  projectMeta.timeEntries.forEach((te) =>
    allDates.add(format(new Date(te.entryDate), "yyyy-MM-dd"))
  );
  projectMeta.statusHistory.forEach((st) =>
    allDates.add(format(new Date(st.dateCreated), "yyyy-MM-dd"))
  );

  const sortedDates = [...allDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const timeline: TimelinePoint[] = [];
  let runningBalance = 0;

  for (const date of sortedDates) {
    let delta = 0;
    let status: string | undefined;

    // accumulate hours for this date (respect debit/credit)
    projectMeta.timeEntries
      .filter((te) => format(new Date(te.entryDate), "yyyy-MM-dd") === date)
      .forEach((te) => {
        // assuming each timeEntry has a .type: "debit" | "credit"
        delta += te.type === "debit" ? te.hours : -te.hours;
      });

    // pick up any status
    const statusForDate = projectMeta.statusHistory.find(
      (st) => format(new Date(st.dateCreated), "yyyy-MM-dd") === date
    );
    if (statusForDate) {
      // adapt depending on your schema, e.g. .statusName or .status
      status = statusForDate.title;
    }

    runningBalance += delta;

    timeline.push({
      date,
      delta,
      balance: runningBalance,
      status,
    });
  }

  const dates = timeline.map((p) => p.date);
  const values = timeline.map((p) => p.balance);

  const minBalance = Math.min(...values);
  const maxBalance = Math.max(...values);

  const settings: SparkLineChartProps = {
    data: values,
    baseline: "min",
    margin: { top: 5, bottom: 0, left: 0, right: 0 },
    xAxis: { id: "activity-axis", data: dates },
    yAxis: {
      domainLimit: () => ({
        min: minBalance,
        max: maxBalance,
      }),
    },
    sx: {
      [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
      [`& .${lineElementClasses.root}`]: { strokeWidth: 2 },
      [`& .${chartsAxisHighlightClasses.root}`]: {
        stroke: "rgb(63, 81, 181)",
        strokeWidth: 2,
        strokeDasharray: "none",
      },
    },
    slotProps: { lineHighlight: { r: 4 } },
    clipAreaOffset: { top: 2, bottom: 2 },
    axisHighlight: { x: "line" },
  };

  const details =
    highlightIndex === null ? (
      "Activity Timeline"
    ) : (
      <>
        {format(new Date(timeline[highlightIndex].date), "MMM dd, yyyy")} {" | "}
        {timeline[highlightIndex].delta >= 0
          ? `+${timeline[highlightIndex].delta.toFixed(2)} hrs`
          : `${timeline[highlightIndex].delta.toFixed(2)} hrs`}
        {" | "}Balance: {timeline[highlightIndex].balance.toFixed(2)} hrs
        {" | "}Status: {timeline[highlightIndex].status ?? "None"}
      </>
    );

  return (
    <Stack direction="column" width="100%">
      <Typography
        variant="subtitle2"
        className="truncate p-1"
        sx={{ color: "text.secondary", fontWeight: 500, mb: 0.5 }}
      >
        {details}
      </Typography>

      <Separator className="mb-2" size="4" />

      <SparkLineChart
        height={60}
        // width={}
        area
        showHighlight
        color="rgb(63,81,181)"
        onHighlightedAxisChange={(axisItems) => {
          setHighlightIndex(axisItems[0]?.dataIndex ?? null);
        }}
        highlightedAxis={
          highlightIndex === null
            ? []
            : [{ axisId: "activity-axis", dataIndex: highlightIndex }]
        }
        {...settings}
      />
    </Stack>
  );
}
