import { Box, TextField, InputAdornment, Button, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import Header from "../../components/Header";
import InsertAttachment from "../../components/InsertAttachment";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../../stores/useTaskStore";

const NewTaskForm = () => {
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [file, setFile] = useState(null);
  const [dateValue, setDateValue] = useState(dayjs());
  const [timeValue, setTimeValue] = useState(dayjs());
  const navigate = useNavigate(); // Initialize useNavigate
  const addTask = useTaskStore((state) => state.addTask);

  // Handler for file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log(file); // For demonstration, handle file as needed
  };

  const handleCancel = () => {
    navigate("/tasks"); // Use the path that matches your routing setup
  };

  const handleSave = () => {
    const task = {
      id: Date.now(),
      title,
      instruction,
      fileName: file ? file.name : "No file attached",
      dueDate: dateValue.format("YYYY-MM-DD"),
      dueTime: timeValue.format("HH:mm"),
      numberOfSubmissions: 0,
    };
    addTask(task);
    navigate("/tasks");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m={2}>
        <Header title="Tasks" subtitle="Assign Tasks" />

        <Stack direction="column" spacing={2}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="title"
            label="Add Title"
            value={title} // Use title here
            onChange={(e) => setTitle(e.target.value)} // Use setTitle here
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ marginRight: "8px" }}>
                  <MenuIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline // Allows for multiple lines of input
            rows={4} // Adjust the number of rows as needed
            id="instruction"
            label="Add Instruction"
            value={instruction} // Set value for instruction
            onChange={(e) => setInstruction(e.target.value)} // Set onChange handler for instruction
            InputProps={{}}
          />

          <InsertAttachment onFileSelect={handleFileSelect} />

          <DatePicker
            label="Due Date"
            value={dateValue}
            onChange={setDateValue}
            components={{
              textField: ({ inputRef, inputProps, InputProps, ...others }) => (
                <TextField
                  {...others}
                  // Spread the inputProps onto the TextField
                  // This includes value, onChange, onBlur, etc.
                  {...inputProps}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon color="action" />
                      </InputAdornment>
                    ),
                    // Spread the InputProps onto the TextField's InputProps
                    // This includes endAdornment, etc.
                    ...InputProps,
                  }}
                  ref={inputRef}
                />
              ),
            }}
          />
          <TimePicker
            label="Due Time"
            value={timeValue}
            onChange={setTimeValue}
            components={{
              textField: ({ inputRef, inputProps, InputProps, ...others }) => (
                <TextField
                  {...others}
                  {...inputProps}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon color="action" />
                      </InputAdornment>
                    ),
                    ...InputProps,
                  }}
                  ref={inputRef}
                />
              ),
            }}
          />
        </Stack>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default NewTaskForm;
