import { Link, TableCell, TableRow } from "@mui/material";
import useProjectComputed from "../../state/hooks/useProjectComputed";
import type { ProjectProps } from "./types";
import { useRef } from "react";
import { useNavigationTransition } from "../../state/hooks/transition/useNavigationTransition";
import { Heading } from "@radix-ui/themes";
import { Token } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";

const ProjectRow = ({ project }: { project: ProjectProps }) => {
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
  const manager =
    projectMeta?.manager?.firstName ??
    projectMeta?.manager?.lastName ??
    undefined;
  const hoursAssigned = debit ?? 0;
  const hoursUsed = credit ?? 0;

  return (
    <TableRow
      ref={tableRef}
      hover
      sx={{
        "& td": {
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
    >
      {error ? (
        <TableCell colSpan={5} style={{ color: "red" }}>
          Failed to load project
        </TableCell>
      ) : (
        <>
          <TableCell>
            {isLoading ? (
              <SkeletonText width="80px" />
            ) : (
              <Link onClick={() => transitionTo(`/project/${project.ID}`)}>
                <Heading className="cursor-pointer !text-sm">
                  {project.name}
                </Heading>
              </Link>
            )}
          </TableCell>

          <TableCell>
            {isLoading ? (
              <SkeletonText width="60px" />
            ) : (
              manager ?? <em className="text-gray-500">Unassigned</em>
            )}
          </TableCell>

          <TableCell align="right">
            {isLoading ? (
              <SkeletonText width="40px" />
            ) : (
              <span style={{ color: hoursAssigned > hoursUsed ? "green" : "orange" }}>
                {hoursAssigned.toFixed(2)}
              </span>
            )}
          </TableCell>

          <TableCell align="right">
            {isLoading ? (
              <SkeletonText width="40px" />
            ) : (
              <span style={{ color: hoursUsed > hoursAssigned ? "red" : "inherit" }}>
                {hoursUsed.toFixed(2)}
              </span>
            )}
          </TableCell>

          <TableCell>
            {isLoading ? (
              <SkeletonText width="50px" />
            ) : (
              <Token
                color={outOfBudget ? "red" : "green"}
                text={outOfBudget ? "OOB" : "Healthy"}
              />
            )}
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default ProjectRow;
