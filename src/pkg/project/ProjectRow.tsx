import { Link, TableCell, TableRow } from "@mui/material";
// import { useRef } from "react";
import useProjectComputed from "../../state/hooks/useProjectComputed";
import type { ProjectProps } from "./types";
import { useRef } from "react";
import { useNavigationTransition } from "../../state/hooks/transition/useNavigationTransition";
import { Heading } from "@radix-ui/themes";
import { Token } from "@primer/react";
// import type { ProjectProps } from "../../../pkg/project/types";

const ProjectRow = ({ project }: { project: ProjectProps  }) => {
  const tableRef = useRef<HTMLTableRowElement>(null);
 const { transitionTo } = useNavigationTransition();
  const {
    projectMeta,
    debit,
    credit,
    outOfBudget,
    error,
    isLoading,
  } = useProjectComputed(project.ID, tableRef);

  // Derive fields
  // const name = project?.name ?? "Unknown";
  const manager =
    projectMeta?.manager?.firstName ??
    projectMeta?.manager?.lastName ??
    "Unassigned";
  const hoursAssigned = debit ?? 0;
  const hoursUsed = credit ?? 0;
  // const status = outOfBudget ? "OOB" : "Healthy";

  return (
    // <div ref={parentRef}>
      <TableRow
      ref={tableRef}
        hover
        sx={{
          "& td": {
            // maxWidth: 150,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          },
        }}
      >
        {isLoading ? (
          <TableCell colSpan={5}>Loading...</TableCell>
        ) : error ? (
          <TableCell colSpan={5} style={{ color: "red" }}>
            Failed to load project
          </TableCell>
        ) : (
            <>
            <TableCell>
              <Link onClick={() => transitionTo(`/project/${project.ID}`)}>
              <Heading className="cursor-pointer !text-sm">
                {project.name}
              </Heading>
              </Link>
            </TableCell>
            <TableCell>{manager}</TableCell>
            <TableCell
              align="right"
              sx={{ color: hoursAssigned > hoursUsed ? "green" : "orange" }}
            >
              {hoursAssigned.toFixed(2)}
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: hoursUsed > hoursAssigned ? "red" : "inherit" }}
            >
              {hoursUsed.toFixed(2)}
            </TableCell>
            <TableCell>
              <Token
              color={outOfBudget ? "red" : "green"}
              text={outOfBudget ? "OOB" : "Healthy"}
              />
            </TableCell>
            </>
        )}
      </TableRow>
    // </div>
  );
};

export default ProjectRow;
