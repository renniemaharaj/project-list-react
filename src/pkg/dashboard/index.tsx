import { Blankslate} from "@primer/react/experimental";
import useQueryDashboard from "../../state/hooks/tanstack/useQueryDashboard";
import DashboardComp from "./Dashboard";
import { TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { isLoading, error, data } = useQueryDashboard();
  // const [data, setdata] = useState<Dashboarddata>();

  if (isLoading)
    return (
      <>
        <Blankslate>
          <Blankslate.Visual>
            <TrendingUp />
          </Blankslate.Visual>
          <Blankslate.Heading> Dashboard Metrics </Blankslate.Heading>
          <Blankslate.Description>
            We're computing your dashboard.
          </Blankslate.Description>
        </Blankslate>
      </>
    );

  // Component returns an error text instead of dashboard if error
  if (error) return <p className="text-red-500">Error getting dashboard.</p>;

  // Set skeleton data or dashboard if truthy
  if (!data) return <p className="text-red-500">Error loading dashboard.</p>;

  // Return dashboard component
  return <DashboardComp dashboard={data} />;
};

export default Dashboard;
