// src/state/hooks/useProjectComputed.ts
import { useCallback, useEffect, useState } from "react";
import useQueryProjectMeta from "./tanstack/useQueryProjectMeta";
import type { Consultant, ProjectMetaData, TimeEntry } from "../../pkg/project/types";

export default function useProjectComputed(
  projectID: number,
  parentRef?: React.RefObject<Element | null> // accept any element ref
) {
  const { data, error, isLoading, setProjectID } = useQueryProjectMeta();
  const [projectMeta, setProjectMeta] = useState<ProjectMetaData>();
  const [inView, setInView] = useState(false);

  // keep local projectMeta in sync with data
  useEffect(() => {
    if (data) setProjectMeta(data);
  }, [data]);

  // observe element visibility to trigger setProjectID
  useEffect(() => {
    if (!parentRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(parentRef.current);

    return () => observer.disconnect();
  }, [parentRef]);

  useEffect(() => {
    if (inView) setProjectID(projectID);
  }, [inView, projectID, setProjectID]);

  // derived numbers
  const debit =
    projectMeta?.timeEntries
      ?.filter((e: TimeEntry) => e.type === "debit")
      .reduce((acc: number, e: TimeEntry) => acc + e.hours, 0) ?? 0;

  const credit =
    projectMeta?.timeEntries
      ?.filter((e: TimeEntry) => e.type === "credit")
      .reduce((acc: number, e: TimeEntry) => acc + e.hours, 0) ?? 0;

  const outOfBudget = credit > debit;

  // helper to resolve consultant names
  const getConsultantNameByID = useCallback(
    (id: number) =>
      projectMeta?.consultants?.find((c: Consultant) => c.ID === id)?.firstName ??
      "Unknown",
    [projectMeta]
  );

  // group time entries by consultant
  const groupTimeEntriesByConsultant = useCallback(
    (timeEntries: TimeEntry[] = []) => {
      const grouped = timeEntries
        .filter((t) => t.type !== "debit")
        .reduce<Record<number, { id: number; value: number; label: string }>>(
          (acc, t) => {
            const id = t.consultantID;
            if (!acc[id]) {
              acc[id] = { id, value: 0, label: getConsultantNameByID(id) };
            }
            acc[id].value += parseFloat(t.hours.toFixed(2));
            return acc;
          },
          {}
        );
      return Object.values(grouped);
    },
    [getConsultantNameByID]
  );

  return {
    projectMeta,
    debit,
    credit,
    outOfBudget,
    getConsultantNameByID,
    groupTimeEntriesByConsultant,
    error,
    isLoading,
  };
}
