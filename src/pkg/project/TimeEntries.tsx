import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
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

          {timeEntries?.map((timeEntry, idx) => (
            <div key={timeEntry.ID}>
              <div className="flex justify-between items-start">
                <div>
                  <Typography variant="h6" className="font-medium">
                    {timeEntry.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {timeEntry.description || "No description"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={`${
                      timeEntry.type === "debit" ? "success" : "error"
                    }`}
                  >
                    {new Date(timeEntry.entryDate).toLocaleDateString()} •{" "}
                    {timeEntry.hours.toFixed(2)} hrs • {timeEntry.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {" by "}
                    {
                      consultants?.find(
                        (consultant) => consultant.ID === timeEntry.consultantID
                      )?.firstName
                    }
                  </Typography>
                </div>

                {onDelete && (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onDelete(timeEntry.ID)}
                  >
                    <Trash2 className="w-2 h-2 text-red-500" />
                  </IconButton>
                )}
              </div>

              {idx < (timeEntries?.length ?? 0) - 1 && (
                <Divider className="my-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default TimeEntries;
