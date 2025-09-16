import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { type ReactNode } from "react";
import useThemeContext from "../../state/hooks/theme/useThemeContext";
import * as motion from "motion/react-client";
import { useInView } from "../../state/hooks/useInView";

const StatCard = ({
  icon,
  className,
  label,
  value,
  gauge,
}: {
  icon?: React.ReactNode;
  className?: string;
  label: string;
  value?: string;
  gauge?: ReactNode;
}) => {
  const { theme } = useThemeContext();
  const { ref, isInView } = useInView<HTMLDivElement>(); 
  // 👆 only triggers the first time

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      className={className}
    >
      <Card
        variant="outlined"
        className={`${theme === "light" ? "!bg-blue-50" : ""} shadow p-4 flex flex-row items-start`}
      >
        <CardContent className="p-0 flex flex-row gap-2 justify-center items-center">
          {icon && <div className="text-gray-500">{icon}</div>}
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            {value && <p className="text-2xl font-bold">{value}</p>}
          </div>
          {gauge}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
