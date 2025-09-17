import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import React, { type ReactNode } from "react";
import { Flex } from "@radix-ui/themes";
import useThemeContext from "../../state/hooks/theme/useThemeContext";
import * as motion from "motion/react-client";
import { useInView } from "../../state/hooks/useInView";
import type { StatActionButton } from "./types";
import { Separator } from "@radix-ui/themes";
import { Button } from "@mui/material";
import { ChevronRightIcon } from "lucide-react";

const StatCard = ({
  icon,
  className,
  label,
  value,
  gauge,
  actionBar,
}: {
  icon?: React.ReactNode;
  className?: string;
  label: string;
  value?: string;
  gauge?: ReactNode;
  actionBar?: StatActionButton[];
}) => {
  const { theme } = useThemeContext();
  const { ref, isInView } = useInView<HTMLDivElement>({
    windowMs: 20,
    threshold: 0.2,
    rootMargin: "200px",
  });

  const hoverBorderColor = theme === "light" ? "hover:!border-blue-500" : "hover:!border-purple-400";
  const hoverTextColor = theme === "light" ? "hover:!text-blue-600" : "hover:!text-purple-300";
  const actionTextColor = theme === "light" ? "text-gray-600" : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      className={className}
    >
      <Card
        variant="outlined"
        className={`!transition-all !duration-300 ease-in-out shadow-sm p-0 flex flex-col items-stretch
          ${theme === "light" ? "!bg-blue-50" : ""} hover:scale-[1.01] hover:!border ${hoverBorderColor} rounded-md overflow-hidden`}
      >
        {/* Main content */}
        <Flex
          direction="column"
          gap="2"
          className="p-4 shadow-inner rounded-t-md transition-colors duration-300"
        >
          <Flex className="items-center gap-3">
            {icon && (
              <div className={`transition-colors duration-300 ease-in-out hover:${hoverTextColor}`}>
                {icon}
              </div>
            )}
            <div className="flex-1">
              <p className="text-gray-600 text-sm">{label}</p>
              {value && (
                <p className="text-2xl font-semibold ">{value}</p>
              )}
            </div>
            {gauge}
          </Flex>
        </Flex>

        <Separator size="4" />

        {/* Actions */}
        {actionBar && actionBar.length > 0 && (
          <Flex className="p-2 gap-2">
            {actionBar.map((stat, i) => {
              const fullWidth = actionBar.length === 1 ? "flex-1" : "flex-1 sm:flex-none";
              return (
                <Button
                  key={stat.title + i}
                  size="small"
                  variant="outlined"
                  className={`${fullWidth} flex items-center justify-between text-sm ${actionTextColor} transition-colors duration-300 ease-in-out hover:${hoverTextColor} hover:border-current`}
                  onClick={stat.action}
                >
                  {stat.title}
                  <ChevronRightIcon className="w-2 h-2 ml-2" />
                </Button>
              );
            })}
          </Flex>
        )}
      </Card>
    </motion.div>
  );
};

export default StatCard;
