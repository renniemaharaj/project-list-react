// src/components/project/ProjectTable.tsx
import { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Project from ".";

interface ProjectTableProps {
  projectIDs: number[];
  containerRef?: React.RefObject<HTMLDivElement | null>; // optional ref for scrolling
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projectIDs,
  containerRef,
}) => {
  const defaultRef = useRef<HTMLDivElement>(null);
  const tableRef = containerRef || defaultRef;

  const cellStyles = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <TableContainer
      ref={tableRef}
      sx={{
        maxHeight: "22rem",
        overflow: "auto",
      }}
    >
      <Table stickyHeader size="small" className="min-h-[10rem]">
        <TableHead>
          <TableRow>
            {["Project", "Manager", "Hrs Assigned", "Hrs Used", "Status"].map(
              (label) => (
                <TableCell key={label} sx={cellStyles}>
                  {label}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {projectIDs?.map((projectID, i) => (
            <Project
              key={`${i}-project`}
              projectID={projectID}
              variant="list"
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
