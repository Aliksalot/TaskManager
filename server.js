const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.text())

const dbFunctions =  require('./database.js')


app.get('/home', (req, res) => {
  const filePath = path.join(__dirname, './public/html/home.html')
  res.sendFile(filePath);
});

app.get('/scripts/initial_buttons.js', (req, res) => {
    const filePath = path.join(__dirname, './public/scripts/buttons.js')
    res.sendFile(filePath)
})

app.get('/scripts/load_all.js', (req, res) => {
    const filePath = path.join(__dirname, './public/scripts/buttons.js')
    res.sendFile(filePath)
})

app.get('/all_tasks', (req, res) => {
  res.send(dbFunctions.getAllTaskNames())
})

app.post('/add', (req, res) => {
    const task = req.body;
    dbFunctions.addTask(req.body)
    res.send('Received the response!');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});