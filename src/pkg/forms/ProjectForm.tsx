import { Button, Text } from "@primer/react";
import { FormControl, TextInput } from "@primer/react-brand";
import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const ProjectForm = ({ onClose }: { onClose: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const form = formRef.current;

    const formSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const formData = new FormData(form);

      // TODO: handle submission properly here
      console.log("Form Data:", Object.fromEntries(formData));

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

        {/* Project Number + Name */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.3fr 1fr",
            gap: 16,
          }}
        >
          <FormControl fullWidth required>
            <FormControl.Label>Project Number</FormControl.Label>
            <TextInput
              name="number"
              type="number"
              required
              min={1}
              autoComplete="off"
              placeholder="e.g. 101"
            />
          </FormControl>

          <FormControl fullWidth required>
            <FormControl.Label>Project Name</FormControl.Label>
            <TextInput
              name="name"
              required
              autoComplete="off"
              placeholder="Project Alpha"
            />
          </FormControl>
        </div>

        {/* Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <DatePicker
              label="Projected Start Date"
              slotProps={{ textField: { fullWidth: true, required: true, name: "projectedStartDate" } }}
            />
            <DatePicker
              label="Start Date"
              slotProps={{ textField: { fullWidth: true, name: "startDate" } }}
            />
            <DatePicker
              label="Projected End Date"
              slotProps={{ textField: { fullWidth: true, required: true, name: "projectedEndDate" } }}
            />
            <DatePicker
              label="End Date"
              slotProps={{ textField: { fullWidth: true,  name: "endDate" } }}
            />
          </div>
        </LocalizationProvider>

        {/* Description */}
        <FormControl fullWidth required>
          <FormControl.Label>Project Description</FormControl.Label>
          <TextField
            name="description"
            required
            fullWidth
            multiline
            rows={3}
            placeholder="Enter a brief project description..."
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
            Create Project
          </Button>
        </div>
      </div>
    </form>
  );
};
