const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

class User {
  constructor({ id, firstName, lastName, password }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const userData = req.body;
  const user = new User(userData);

  const filePath = path.join(__dirname, 'registrations.csv');

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
