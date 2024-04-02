import {
  Box,
  Card,
  Typography,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../theme"; // Update this path if necessary
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddedActivity = ({ title, numberOfBeneficiaries, activityId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // This function navigates to the ViewActivity page with the specific activityId
  const handleView = () => {
    navigate(`/activities/view/${activityId}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: "16px",
        boxShadow: 3,
        border: `3px solid ${colors.greenAccent[500]}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AddTaskOutlinedIcon
          sx={{
            fontSize: 40,
            color: colors.greenAccent[500],
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
          sx={{ color: colors.greenAccent[400], mt: 1 }}
        >
          {numberOfBeneficiaries} No. of Beneficiaries
        </Typography>
      </Box>
    </Card>
  );
};

AddedActivity.propTypes = {
  title: PropTypes.string.isRequired,
  activityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddedActivity;
