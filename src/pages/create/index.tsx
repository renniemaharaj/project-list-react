import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { showCreateFormAtom } from "../../state/app.atoms";

const CreateProject = () => {
  const setShowCreateForm = useSetAtom(showCreateFormAtom);
  useEffect(() => setShowCreateForm(true), [setShowCreateForm]);
  return <></>;
};

export default CreateProject;
