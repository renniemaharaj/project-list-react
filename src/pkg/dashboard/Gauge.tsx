import { Gauge as M, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";

const Gauge = ({
  value,
  maxValue,
  color,
}: {
  value: number;
  maxValue: number;
  color: "danger" | "green";
}) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(value + maxValue);
  }, [value, maxValue]);
  return (
    <M
      key={key}
      width={110}
      height={110}
      value={value}
      valueMax={maxValue}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
      sx={{
        [`& .${gaugeClasses.valueArc}`]: {
          fill: color === "danger" ? "red" : "#52b202",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: "#ccc",
        },
      }}
    />
  );
};

export default Gauge;
