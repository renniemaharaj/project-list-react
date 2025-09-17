import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkLineChart, type SparkLineChartProps } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses, lineElementClasses } from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import type { ProjectMetaData } from "./types";
import { format } from "date-fns";

interface ProjectActivitySparklineProps {
  projectMeta: ProjectMetaData;
}

export default function ProjectActivitySparkline({
  projectMeta,
}: ProjectActivitySparklineProps) {
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(null);

  // Aggregate activity by date
  const dataMap: Record<string, number> = {};

  projectMeta.timeEntries.forEach((te) => {
    const date = format(new Date(te.entryDate), "yyyy-MM-dd");
    dataMap[date] = (dataMap[date] || 0) + te.hours;
  });

  projectMeta.statusHistory.forEach((status) => {
    const date = format(new Date(status.dateCreated), "yyyy-MM-dd");
    dataMap[date] = (dataMap[date] || 0) + 1; // count each status as 1
  });

  const dates = Object.keys(dataMap).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const values = dates.map((d) => dataMap[d]);

  const settings: SparkLineChartProps = {
    data: values,
    baseline: "min",
    margin: { top: 5, bottom: 0, left: 4, right: 0 },
    xAxis: { id: "activity-axis", data: dates },
    yAxis: {
      domainLimit: (_, maxValue: number) => ({
        min: 0,
        max: maxValue,
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

  return (
    <Stack direction="column" width="100%" mt={1}>
      <Typography
        variant="subtitle2"
        sx={{ color: "text.secondary", fontWeight: 500, mb: 0.5 }}
      >
        Project Activity
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ borderBottom: "solid 2px rgba(63,81,181,0.2)" }}
      >
        <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
          {highlightIndex === null
            ? "Activity Timeline"
            : format(new Date(dates[highlightIndex]), "MMM dd, yyyy")}
        </Typography>
        <SparkLineChart
          height={40}
          width={450}
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
    </Stack>
  );
}
