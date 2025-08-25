import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Project from "../../pkg/project";

const ProjectRoute = () => {
  const paramsProjectID = useParams().projectID;
  const [projectID, setProjectID] = useState<number>(0);

  const setProjectIDCallback = useCallback(
    (ID: number) => {
      setProjectID(ID);
    },
    [setProjectID]
  );

  useEffect(() => {
    const parsedID = Number(paramsProjectID);
    if (!parsedID || isNaN(parsedID) || parsedID <= 0) return;
    setProjectIDCallback(parsedID);
  }, [paramsProjectID, projectID, setProjectIDCallback]);

  if (!projectID)
    return <p className="text-red-500">Invalid project ID in URL.</p>;

  return <Project projectID={projectID} size="lg" />;
};

export default ProjectRoute;
