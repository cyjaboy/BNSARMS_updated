// NewActivityForm.jsx
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import useBeneficiaryStore from "../../stores/useBeneficiaryStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import SelectBeneficiariesModal from "./selectBeneficiariesModal";
import useActivityStore from "../../stores/useActivityStore";

const NewActivityForm = () => {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const beneficiaries = useBeneficiaryStore((state) => state.beneficiaries);
  const [isBeneficiaryModalOpen, setIsBeneficiaryModalOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]); // Manage selected beneficiary IDs
  const addActivity = useActivityStore((state) => state.addActivity);

  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "barangay", headerName: "Barangay", width: 130 },
    { field: "purok", headerName: "Purok", width: 130 },
    { field: "sex", headerName: "Sex", width: 120 },
    { field: "job", headerName: "Job", width: 130 },
    { field: "birthdate", headerName: "Birthdate", width: 130 },
  ];

  const handleSave = () => {
    // When saving, ensure to pass the selectionModel to the addActivity function
    addActivity(
      {
        title: activityName,
        description,
        date: selectedDate.format("YYYY-MM"),
      },
      selectionModel
    ); // Now correctly passing selectionModel
    navigate("/activities");
  };

  const handleCancel = () => {
    navigate("/activities");
  };

  const handleOpenBeneficiaryModal = () => {
    setIsBeneficiaryModalOpen(true);
  };

  const handleCloseBeneficiaryModal = () => {
    setIsBeneficiaryModalOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m={2}>
        <Header title="New Activity" subtitle="Add a new activity" />
        <Stack spacing={2}>
          <TextField
            label="Activity Name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <DatePicker
            views={["year", "month"]}
            label="Month and Year"
            value={selectedDate}
            onChange={setSelectedDate}
            components={{
              textField: ({ inputRef, inputProps, InputProps, ...others }) => (
                <TextField
                  {...others}
                  // Spread the inputProps onto the TextField
                  // This includes value, onChange, onBlur, etc.
                  inputProps={{ ...inputProps, placeholder: "MM/YYYY" }}
                  // Spread the rest of InputProps onto the TextField's InputProps
                  // This includes endAdornment, etc.
                  InputProps={InputProps}
                  ref={inputRef}
                  fullWidth
                />
              ),
            }}
          />
          <Button variant="outlined" onClick={handleOpenBeneficiaryModal}>
            Add Beneficiary
          </Button>
        </Stack>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </Box>
      </Box>
      <Dialog
        open={isBeneficiaryModalOpen}
        onClose={handleCloseBeneficiaryModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Beneficiaries</DialogTitle>
        <DialogContent>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid rows={beneficiaries} columns={columns} pageSize={5} />
          </Box>
          {/* Removed NewBeneficiary component instantiation */}
        </DialogContent>
      </Dialog>
      <SelectBeneficiariesModal
        isOpen={isBeneficiaryModalOpen}
        onClose={handleCloseBeneficiaryModal}
        onSave={(selectedIds) => setSelectionModel(selectedIds)}
      />
    </LocalizationProvider>
  );
};

export default NewActivityForm;
