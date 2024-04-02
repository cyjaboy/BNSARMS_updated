import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";

const SubmitReports = () => {
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Reports" subtitle="Submit Reports" />
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
        </Box>
      </Box>
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
    </Box>
  );
};

export default SubmitReports;
