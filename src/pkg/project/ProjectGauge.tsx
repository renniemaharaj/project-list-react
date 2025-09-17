import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function ProjectGauge({ debit, credit }: { debit: number; credit: number }) {
  return (
    <Gauge
      width={100}
      height={100}
      value={credit}
      valueMax={debit || 1}
      text={({ value, valueMax }) =>
        `${parseFloat(value?.toFixed(1) ?? "0")}/${parseFloat(
          valueMax.toFixed(1)
        )}`
      }
      sx={{
        [`& .${gaugeClasses.valueArc}`]: {
          fill: credit > debit ? "red" : "#52b202",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: "#e5e7eb",
        },
      }}
    />
  );
}

export default ProjectGauge