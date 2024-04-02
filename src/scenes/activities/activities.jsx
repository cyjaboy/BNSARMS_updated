import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import AddedActivity from "../../components/AddedActivity"; // Ensure this path is correct
import useActivityStore from "../../stores/useActivityStore"; // Ensure this path is correct
import { tokens } from "../../theme"; // Ensure this path is correct

const Activities = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { activities } = useActivityStore((state) => state);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  // Generate years from 2023 to 2050
  const years = Array.from({ length: 28 }, (_, i) => 2023 + i);

  const handleOpenNewActivityForm = () => navigate("/activities/new");

  return (
    <Box m={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Activities" subtitle="View Your Activities" />
        <Box display="flex">
          <FormControl
            variant="outlined"
            size="small"
            sx={{ mr: 2, minWidth: 120 }}
          >
            <InputLabel id="select-month-label">Select Month</InputLabel>
            <Select
              labelId="select-month-label"
              id="select-month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
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
          <FormControl
            variant="outlined"
            size="small"
            sx={{ mr: 2, minWidth: 120 }}
          >
            <InputLabel id="select-year-label">Select Year</InputLabel>
            <Select
              labelId="select-year-label"
              id="select-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Select Year"
              sx={{ bgcolor: "background.paper" }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenNewActivityForm}
            sx={{ bgcolor: colors.greenAccent[500] }}
          >
            Add New Activity
          </Button>
        </Box>
      </Box>
      <Stack spacing={2} mt={2}>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <AddedActivity
              key={activity.id}
              title={activity.title}
              numberOfBeneficiaries={activity.numberOfBeneficiaries}
              activityId={activity.id}
            />
          ))
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100vh - 100px)" }}
          >
            <Typography variant="h6" color="textSecondary">
              No Activities Created
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Activities;
