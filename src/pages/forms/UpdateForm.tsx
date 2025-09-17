import { useEffect, useRef, useState } from "react";
import { FormControl, TextInput } from "@primer/react-brand";
import { Button, Checkbox, Stack, Text } from "@primer/react";
import { TrashIcon } from "@primer/octicons-react";

const UpdateForm = ({ onClose }: { onClose: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [canDelete, setCanDelete] = useState(false);


  useEffect(() => {
    if (!formRef.current) return;
    const form = formRef.current;

    const formSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      onClose();
    };

    form.addEventListener("submit", formSubmit);
    return () => form.removeEventListener("submit", formSubmit);
  }, [onClose]);

  return (
    <form ref={formRef}>
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: 16,
          margin: "0 auto",
          maxWidth: 600,
          paddingBottom: 3,
        }}
      >
        <Text as="p" variant="muted" size="100">
          All fields marked with an asterisk (*) are required
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 1fr",
            gap: 16,
          }}
        >
          <FormControl fullWidth required>
            <FormControl.Label>Document folder</FormControl.Label>
            <TextInput
              // defaultValue={activeDocument?.folder}
              name="folder"
              autoComplete="family-name"
            />
          </FormControl>
          <FormControl fullWidth required>
            <FormControl.Label>Document title</FormControl.Label>
            <TextInput
              // defaultValue={activeDocument?.title}
              name="title"
              autoComplete="given-name"
            />
          </FormControl>
        </div>

        <FormControl fullWidth required>
          <FormControl.Label>Document description</FormControl.Label>
          <TextInput
            // defaultValue={activeDocument?.description}
            name="description"
          />
        </FormControl>

        <FormControl hasBorder>
          <Checkbox name="publish" 
          // defaultChecked={activeDocument?.published} 
          />
          <FormControl.Label>Publish this document</FormControl.Label>
          <FormControl.Hint>
            <Text size="200" variant="muted">
              The document will become public to the internet and visible to the
              community. Enable if this is a page, a blog, an article or
              otherwise.
            </Text>
          </FormControl.Hint>
        </FormControl>
        <FormControl className="!border-red-500" hasBorder>
          <Checkbox
            name="delete"
            className={`${canDelete && "!bg-red-500"} !border-red-500`}
            checked={canDelete}
            onClick={() => setCanDelete(!canDelete)}
          />
          <FormControl.Label>Unlock Delete</FormControl.Label>
          <FormControl.Hint>
            <Text size="200" variant="muted">
              Unlock the delete button of this document.
            </Text>
          </FormControl.Hint>
        </FormControl>
        <div
          style={{
            justifyContent: "end",
            display: "inline-grid",
            gap: 16,
          }}
        >
          <Stack direction="horizontal">
            {canDelete ? (
              <Button leadingVisual={TrashIcon} variant="danger" type="submit">
                Delete Document
              </Button>
            ) : (
              <Button
                type="submit"
              >
                Update Document
              </Button>
            )}
          </Stack>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
