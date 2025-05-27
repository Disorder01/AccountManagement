const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const User = require('../Backend/models/user');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const filePath = path.join(__dirname, 'database', 'users.csv');
  const newId = getNextId(filePath); 

  const userData = req.body;
  userData.id = newId; 
  const user = new User(userData);

  const csvLine = `${user.id},${user.firstName},${user.lastName},${user.password}\n`

  const header = 'id,firstName,lastName,password\n';

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header, 'utf-8');
  }

  fs.appendFileSync(filePath, csvLine, 'utf-8');

  res.json({ success: true, user });
});

app.post('/api/login', (req, res) => {
  const filePath = path.join(__dirname, 'database', 'users.csv');
  const { lastName, password } = req.body;

  if (!fs.existsSync(filePath)) {
    return res.json({ success: false });
  }

  const lines = fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(line => line.trim() !== '');

  // Zeile 0 = Header
  for (let i = 1; i < lines.length; i++) {
    const [id, firstName, currentLastName, currentPassword] = lines[i].split(',');

    if (currentLastName === lastName && currentPassword === password) {
      return res.json({ success: true });
    }
  }

  res.json({ success: false });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

function getNextId(filePath) {
  if (!fs.existsSync(filePath)) return 1;

  const lines = fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(line => line.trim() !== '');

  let maxId = 0;

  // Überspringe Header-Zeile
  for (let i = 1; i < lines.length; i++) {
    const id = parseInt(lines[i].split(',')[0]);
    if (!isNaN(id) && id > maxId) {
      maxId = id;
    }
  }

  return maxId + 1;
}
