import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { showCreateFormAtom } from "../../../../state/app.atoms";

const CreateDocument = () => {
  const setShowCreateForm = useSetAtom(showCreateFormAtom);
  useEffect(() => setShowCreateForm(true), [setShowCreateForm]);
  return <></>;
};

export default CreateDocument;
