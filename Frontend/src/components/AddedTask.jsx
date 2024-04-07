import {
  Box,
  Card,
  //   CardContent,
  Typography,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../theme";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddedTask = ({ title, numberOfSubmissions, taskId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/tasks/view/${taskId}`); // Replace :taskId with actual taskId
  };

  // Assuming 'title' and 'numberOfSubmissions' are passed as props to this component
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: "16px",
        boxShadow: 3,
        border: `3px solid ${colors.greenAccent[500]}`, // Set the border color using theme
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TaskIcon
          sx={{
            fontSize: 40,
            color: tokens().greenAccent[500],
            marginRight: 2,
          }}
        />
        <Typography
          fontWeight="bold"
          variant="h2"
          sx={{ mb: "5px", color: colors.greenAccent[500], mt: 1 }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="edit" size="large">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="view" size="large" onClick={handleView}>
            <VisibilityIcon />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: tokens().greenAccent[400], mt: 1 }}
        >
          {numberOfSubmissions} Submissions
        </Typography>
      </Box>
    </Card>
  );
};

AddedTask.propTypes = {
  title: PropTypes.string.isRequired,
  numberOfSubmissions: PropTypes.number.isRequired,
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AddedTask;
