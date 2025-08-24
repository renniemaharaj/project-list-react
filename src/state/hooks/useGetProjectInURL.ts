import useGetProject from "./useGetProject";
import { useParams } from "react-router-dom";

const useGetProjectInURL = () => {
  const { getProjectByID } = useGetProject();
  const { projectID } = useParams();
  // Parse projectID first
  const parsedID = Number(projectID);
  if (!projectID || isNaN(parsedID) || parsedID <= 0) return 0;
  const projectInURL = getProjectByID(parsedID);
  if (typeof projectInURL === "object")return projectInURL
  return 1
};

export default useGetProjectInURL;
