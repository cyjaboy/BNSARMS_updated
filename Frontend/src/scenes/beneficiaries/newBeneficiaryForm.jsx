import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";

const initialFormData = {
  firstName: "",
  lastName: "",
  type: "",
  address: "",
  sex: "",
  job: "",
  birthdate: "",
};

const NewBeneficiary = ({ open, handleClose }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving form data...");
      console.log("Form data:", formData);
      await axios.post("http://localhost:3000/api/beneficiaries", formData); // Specify the full URL of your API endpoint
      console.log("Form data saved:", formData);
      setFormData(initialFormData);
      handleClose();
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Beneficiary</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="type"
          label="Type"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.type}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="sex"
          label="Sex"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.sex}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="job"
          label="Job"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.job}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="birthdate"
          label="Birthdate"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.birthdate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

NewBeneficiary.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NewBeneficiary;
