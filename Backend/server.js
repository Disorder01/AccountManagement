const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const User = require('models/User');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const userData = req.body;
  const user = new User(userData);

  const filePath = path.join(__dirname, 'database', 'users.csv');

  const csvLine = `${user.id || ''},${user.firstName || ''},${user.lastName || ''},${user.password || ''}\n`;
  const header = 'id,firstName,lastName,password\n';

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header);
  }

  fs.appendFileSync(filePath, csvLine);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
