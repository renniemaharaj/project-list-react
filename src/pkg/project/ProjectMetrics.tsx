import MetricRow from './MetricRow';

function ProjectMetrics({ debit, credit }: { debit: number; credit: number }) {
  return (
    <div className="flex flex-col gap-3">
      <MetricRow
        label="Hrs Assigned:"
        value={debit}
        color={credit > debit ? "orange" : ""}
      />
      <MetricRow
        label="Hrs Used:"
        value={credit}
        color={credit > debit ? "red" : "green"}
      />
    </div>
  );
}


export default ProjectMetrics