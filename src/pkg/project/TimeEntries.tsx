import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Typography from "@m/ui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import Divider from "@mui/material/Divider";
import { ChevronDownIcon, ChevronUpIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@primer/react";
import type { Consultant, TimeEntry } from "./types";
import useThemeContext from "../../state/hooks/theme/useThemeContext";
import TimeEntriesLineChart from "./LineChart";

const TimeEntries = ({
  timeEntries,
  onDelete,
  consultants,
}: {
  timeEntries?: TimeEntry[];
  consultants?: Consultant[];
  onDelete?: (id: number) => void;
}) => {
  const [collapsed, setColappsed] = useState(false);
  const { theme } = useThemeContext();

  useEffect(() => {
    setTimeout(() => {
      setColappsed(true);
    }, 1000);
  }, []);

  return (
    <>
      <Button
        size="small"
        variant="link"
        className="holographic-card w-full"
        onClick={() => setColappsed(!collapsed)}
        aria-label={collapsed ? "Expand time entries" : "Collapse time entries"}
      >
        {collapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>

      <Card
        variant="outlined"
        className={`!transition-all !overflow-y-scroll ${
          collapsed ? "!h-[20rem] opacity-100" : "!h-0 opacity-0"
        } ${theme === "light" ? "!bg-blue-50" : ""} mb-2`}
      >
        <CardContent>
          <TimeEntriesLineChart
            timeEntries={timeEntries ?? []}
            consultants={consultants ?? []}
          />

          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {timeEntries?.map((timeEntry) => (
                <div
                  key={timeEntry.ID}
                  className="flex items-center text-sm border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Title */}
                  <div className="px-2 py-1 w-40 truncate">
                    {timeEntry.title}
                  </div>

                  {/* Description */}
                  <div className="px-2 py-1 w-60 text-gray-600">
                    {timeEntry.description || "No description"}
                  </div>

                  {/* Date */}
                  <div className="px-2 py-1 w-28">
                    {new Date(timeEntry.entryDate).toLocaleDateString()}
                  </div>

                  {/* Hours */}
                  <div className="px-2 py-1 w-20 text-right font-medium">
                    {timeEntry.hours.toFixed(2)}
                  </div>

                  {/* Type */}
                  <div
                    className={`px-2 py-1 w-20 text-center font-semibold ${
                      timeEntry.type === "debit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {timeEntry.type}
                  </div>

                  {/* Consultant */}
                  <div className="px-2 py-1 w-32 truncate text-gray-500">
                    {consultants?.find((c) => c.ID === timeEntry.consultantID)
                      ?.firstName || "—"}
                  </div>

                  {/* Delete Button */}
                  {onDelete && (
                    <div className="px-2 py-1 w-12 flex justify-center">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => onDelete(timeEntry.ID)}
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </IconButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeEntries;
