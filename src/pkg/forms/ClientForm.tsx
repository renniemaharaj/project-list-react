import { Button, Text } from "@primer/react";
import { FormControl, TextInput } from "@primer/react-brand";
import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";

export const ClientForm = ({ onClose }: { onClose: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const form = formRef.current;

    const formSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const formData = new FormData(form);

      // TODO: handle submission properly here
      console.log("Client Data:", Object.fromEntries(formData));

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
          gap: 20,
          margin: "0 auto",
          maxWidth: 700,
          padding: "1rem",
        }}
      >
        <Text as="p" variant="muted" size="100">
          All fields marked with an asterisk (*) are required
        </Text>

        {/* Company Name */}
        <FormControl fullWidth required>
          <FormControl.Label>Company Name</FormControl.Label>
          <TextInput
            name="companyName"
            required
            autoComplete="off"
            placeholder="e.g. Acme Corporation"
          />
        </FormControl>

        {/* Contact Person (First + Last) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <FormControl fullWidth required>
            <FormControl.Label>First Name</FormControl.Label>
            <TextInput
              name="firstName"
              required
              autoComplete="off"
              placeholder="Jane"
            />
          </FormControl>

          <FormControl fullWidth required>
            <FormControl.Label>Last Name</FormControl.Label>
            <TextInput
              name="lastName"
              required
              autoComplete="off"
              placeholder="Doe"
            />
          </FormControl>
        </div>

        {/* Email */}
        <FormControl fullWidth required>
          <FormControl.Label>Email</FormControl.Label>
          <TextInput
            name="email"
            type="email"
            required
            autoComplete="off"
            placeholder="jane.doe@acme.com"
          />
        </FormControl>

        {/* Profile Picture URL */}
        <FormControl fullWidth>
          <FormControl.Label>Profile Picture (URL)</FormControl.Label>
          <TextInput
            name="profilePicture"
            type="url"
            autoComplete="off"
            placeholder="https://example.com/profile.jpg"
          />
        </FormControl>

        {/* Notes / Description */}
        <FormControl fullWidth>
          <FormControl.Label>Notes</FormControl.Label>
          <TextField
            name="notes"
            fullWidth
            multiline
            rows={3}
            placeholder="Any additional client notes..."
          />
        </FormControl>

        {/* Actions */}
        <div
          style={{
            justifyContent: "end",
            display: "flex",
            gap: 16,
          }}
        >
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Client
          </Button>
        </div>
      </div>
    </form>
  );
};
