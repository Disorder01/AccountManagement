const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// CORS aktivieren
app.use(cors());

// JSON Body Parsing Middleware
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const user = req.body;
  const filePath = path.join(__dirname, 'registrations.csv');

  const csvLine = `${user.firstname},${user.lastname},${user.email}\n`;
  const header = 'firstname,lastname,email\n';

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header);
  }

  fs.appendFileSync(filePath, csvLine);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
