
const express = require('express');
const router = express.Router();
const BeneficiaryController = require('./controllers/BeneficiaryController');

// Define route for saving beneficiary data
router.post('/api/beneficiaries', BeneficiaryController.saveBeneficiary);

module.exports = router;
