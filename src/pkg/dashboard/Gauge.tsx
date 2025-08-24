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
      width={100}
      height={100}
      value={value}
      valueMax={maxValue}
      style={{
        transition:"all 1s ease-in-out"
      }}
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
