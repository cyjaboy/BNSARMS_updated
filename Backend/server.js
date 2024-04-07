const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432,
});

app.post('/api/beneficiaries', async (req, res) => {
  const { firstName, lastName, type, address, sex, job, birthdate } = req.body;

  if (!firstName || !lastName || !type || !address || !sex || !job || !birthdate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO beneficiaries (firstname, lastname, type, address, sex, job, birthdate)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;

    const values = [firstName, lastName, type, address, sex, job, birthdate];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'An error occurred while saving form data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
