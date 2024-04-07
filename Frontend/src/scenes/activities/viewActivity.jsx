import { useParams } from "react-router-dom";
import useActivityStore from "../../stores/useActivityStore";
import useBeneficiaryStore from "../../stores/useBeneficiaryStore";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ViewActivity = () => {
  const { activityId } = useParams();
  const activity = useActivityStore((state) =>
    state.activities.find((a) => a.id === Number(activityId))
  );
  const allBeneficiaries = useBeneficiaryStore((state) => state.beneficiaries);
  const beneficiaries = activity
    ? allBeneficiaries.filter((b) => activity.beneficiaries.includes(b.id))
    : [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    // Add more columns as needed
  ];

  // Preparing rows for DataGrid
  const rows = beneficiaries.map((b) => ({
    id: b.id,
    firstName: b.firstName,
    lastName: b.lastName,
  }));

  if (!activity) return <Typography>Activity not found.</Typography>;

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4">{activity.title}</Typography>
      <Typography variant="body1">{activity.description}</Typography>
      <Typography variant="body2">Date: {activity.date}</Typography>
      <Box mt={2}>
        <Typography variant="h6">Beneficiaries:</Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Box>
  );
};

export default ViewActivity;
