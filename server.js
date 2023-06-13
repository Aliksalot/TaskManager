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

app.get('/scripts/add_task.js', (req, res) => {
    const filePath = path.join(__dirname, './public/scripts/add_task.js')
    res.sendFile(filePath)
})

app.get('/scripts/delete_task.js', (req, res) => {
    const filePath = path.join(__dirname, './public/scripts/delete_task.js')
    res.sendFile(filePath)
})

app.get('/all_tasks', (req, res) => {
  res.send(dbFunctions.getAllTaskNames())
})

app.post('/add', (req, res) => {
    const task = req.body;
    console.log(task)
    dbFunctions.addTask(task)
    res.send('Received the response!');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});