import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { type ReactNode } from "react";
import useThemeContext from "../../hooks/theme/useThemeContext";
import * as motion from "motion/react-client";

const StatCard = ({
  icon,
  className,
  label,
  value,
}: {
  icon?: React.ReactNode;
  className?: string;
  label: string;
  value: ReactNode;
}) => {
  const { theme } = useThemeContext();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}   // start below and hidden
      animate={{ y: 0, opacity: 1 }}     // move up into place
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Card
        variant="outlined"
        className={`${theme === "light" ? "!bg-blue-50" : ""} ${
          className ? className : "shadow p-4 flex flex-col items-start w-fit"
        }`}
      >
        <CardContent className="p-0 flex flex-col gap-2 !justify-center !items-center">
          {icon && <div className="text-gray-500">{icon}</div>}
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
