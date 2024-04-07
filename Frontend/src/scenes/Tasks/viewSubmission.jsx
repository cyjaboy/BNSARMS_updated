import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme, Tab, Tabs, Paper } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import useTaskStore from "../../stores/useTaskStore";
import PropTypes from "prop-types";
import { tokens } from "../../theme";

// Ensure the import path matches where your theme.js is located

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ViewSubmission = () => {
  const { taskId } = useParams();
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === Number(taskId))
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!task) {
    return (
      <Typography variant="h6" style={{ marginTop: theme.spacing(2) }}>
        Task not found
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        maxWidth: 800,
        mx: "auto",
        my: 4,
        boxShadow: 3,
        borderRadius: "16px",
        border: `2px solid ${colors.greenAccent[500]}`,
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          ml: 2,
          borderBottom: 1,
          borderColor: "divider",
          "& .Mui-selected": {
            color: colors.greenAccent[400],
          },
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Task Details" />
        <Tab label="BNS Submissions" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {/* Task Details Content */}
        <Box
          display="flex"
          alignItems="flex-start"
          gap={2}
          sx={{ flexDirection: "column" }}
        >
          <TaskIcon
            sx={{
              fontSize: 40,
              color: "secondary.main",
              alignSelf: "flex-start",
            }}
          />
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <DetailBox label="Instruction" content={task.instruction} />
          <DetailBox label="Attached File" content={task.fileName} />
          <DetailBox label="Due Date" content={task.dueDate} />
          <DetailBox label="Due Time" content={task.dueTime} />
          {/* <DetailBox
            label="Number of Submissions"
            content={String(task.numberOfSubmissions)}
          /> */}
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography>No submissions yet</Typography>
      </TabPanel>
    </Paper>
  );
};

// DetailBox Component
const DetailBox = ({ label, content }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
        {label}:
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          mt: 1,
          p: 1,
          borderRadius: "16px",
          backgroundColor: "action.hover",
          borderColor: colors.greenAccent[400],
        }}
      >
        <Typography variant="body2">{content}</Typography>
      </Paper>
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

DetailBox.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ViewSubmission;
