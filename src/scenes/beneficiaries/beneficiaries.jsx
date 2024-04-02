import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import NewBeneficiary from "./newBeneficiaryForm";
import useBeneficiaryStore from "../../stores/useBeneficiaryStore";
import { tokens } from "../../theme";
import { useState } from "react";

const Beneficiaries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const barangays = [
    "Glamang",
    "Poblacion",
    "Silway-8",
    "Silway-7",
    "Magsaysay",
  ];

  const [openNewBeneficiaryModal, setOpenNewBeneficiaryModal] = useState(false);

  const handleOpenNewBeneficiaryModal = () => setOpenNewBeneficiaryModal(true);
  const handleCloseNewBeneficiaryModal = () =>
    setOpenNewBeneficiaryModal(false);

  const handleBarangayChange = (event) => {
    setSelectedBarangay(event.target.value);
  };

  const beneficiaries = useBeneficiaryStore((state) => state.beneficiaries);

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "barangay", headerName: "Barangay", width: 130 },
    { field: "purok", headerName: "Purok", width: 130 },
    { field: "sex", headerName: "Sex", width: 120 },
    { field: "job", headerName: "Job", width: 130 },
    { field: "birthdate", headerName: "Birthdate", width: 130 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Beneficiaries" subtitle="View Beneficiaries" />
        <Box>
          <FormControl
            variant="outlined"
            size="small"
            sx={{ minWidth: 135, mr: 2 }}
          >
            <InputLabel>Select Barangay</InputLabel>
            <Select
              value={selectedBarangay}
              onChange={handleBarangayChange}
              label="Select Barangay"
              sx={{ bgcolor: "background.paper" }}
            >
              {barangays.map((barangay) => (
                <MenuItem key={barangay} value={barangay}>
                  {barangay}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ bgcolor: colors.greenAccent[500] }}
            onClick={handleOpenNewBeneficiaryModal} // Updated to open the modal
          >
            Add Beneficiary
          </Button>
          <NewBeneficiary
            open={openNewBeneficiaryModal}
            handleClose={handleCloseNewBeneficiaryModal}
          />
        </Box>
      </Box>
      <Box m="20px">
        <div style={{ height: 400, width: "100%", marginTop: 20 }}>
          <DataGrid
            rows={beneficiaries.map((b, index) => ({ id: index, ...b }))}
            columns={columns}
            pageSize={5}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Beneficiaries;
