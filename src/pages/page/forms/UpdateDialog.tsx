import React, { useEffect } from "react";
import { Button } from "@primer/react";
import { Dialog } from "@primer/react/experimental";
import UpdateForm from "./UpdateForm";
import { useSetAtom } from "jotai";
import { showUpdateFormAtom } from "../../../state/app.atoms";

const UpdateDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const onDialogClose = React.useCallback(() => setIsOpen(false), []);

  const setShowUpdateForm = useSetAtom(showUpdateFormAtom);

  useEffect(() => {
    setShowUpdateForm(isOpen);
  }, [isOpen, setShowUpdateForm]);

  return (
    <>
      <Button
        size="small"
        className={`my-[2px] sticky top-0 z-10`}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        Active Document
      </Button>
      {isOpen && (
        <Dialog title="Update Document" onClose={onDialogClose}>
          <UpdateForm onClose={() => setIsOpen(false)} />
        </Dialog>
      )}
    </>
  );
};

export default UpdateDialog;
