import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useThemeContext();

  useEffect(() => {
    setTimeout(() => setCollapsed(true), 1000);
  }, []);

  return (
    <>
      <Button
        size="small"
        variant="link"
        className="holographic-card w-full"
        onClick={() => setCollapsed(!collapsed)}
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

          <TableContainer sx={{ maxHeight: "16rem", overflowY: "auto" }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Hours</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Consultant</TableCell>
                  {onDelete && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>

              <TableBody>
                {timeEntries?.map((timeEntry) => {
                  const consultantName =
                    consultants?.find((c) => c.ID === timeEntry.consultantID)
                      ?.firstName || "—";

                  return (
                    <TableRow key={timeEntry.ID} hover>
                      <TableCell>{timeEntry.title}</TableCell>
                      <TableCell>{timeEntry.description || "No description"}</TableCell>
                      <TableCell>
                        {new Date(timeEntry.entryDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">{timeEntry.hours.toFixed(2)}</TableCell>
                      <TableCell
                        style={{
                          color: timeEntry.type === "debit" ? "green" : "red",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {timeEntry.type}
                      </TableCell>
                      <TableCell>{consultantName}</TableCell>
                      {onDelete && (
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => onDelete(timeEntry.ID)}
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeEntries;
