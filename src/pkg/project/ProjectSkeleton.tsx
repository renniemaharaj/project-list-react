import Card from "@mui/material/Card";
import useThemeContext from "../../state/hooks/theme/useThemeContext";

const ProjectSkeleton = () => {
  const { theme } = useThemeContext();
  return (
    <Card
      variant="outlined"
      className={`p-2 transition-all w-full animate-pulse ${
        theme === "light" ? "!bg-blue-50" : ""
      }`}
    ></Card>
  );
};

export default ProjectSkeleton;
