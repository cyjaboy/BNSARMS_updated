import {
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import AddedTask from "../../components/AddedTask";
import useTaskStore from "../../stores/useTaskStore";
import { tokens } from "../../theme";
import { useState } from "react";

const Tasks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tasks = useTaskStore((state) => state.tasks);
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("");

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const handleAddTaskClick = () => {
    navigate("/tasks/new");
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Tasks" subtitle="View Your Tasks" />
        <Box>
          <FormControl
            variant="outlined"
            size="small"
            sx={{ minWidth: 120, mr: 2 }}
          >
            <InputLabel>Select Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Select Month"
              sx={{ bgcolor: "background.paper" }}
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ bgcolor: colors.greenAccent[500] }}
            onClick={handleAddTaskClick}
          >
            Add Task
          </Button>
        </Box>
      </Box>
      {tasks.length > 0 ? (
        <Stack spacing={2}>
          {tasks.map((task) => (
            <AddedTask
              key={task.id}
              taskId={task.id.toString()}
              title={task.title}
              numberOfSubmissions={task.numberOfSubmissions}
            />
          ))}
        </Stack>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "calc(100vh - 100px)" }}
        >
          <Typography variant="h6" color="textSecondary">
            No Task Created
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Tasks;
