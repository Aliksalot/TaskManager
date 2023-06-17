const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require("path")
const app = express();
const port = 3000
const auth = require('./auth.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.text())
app.use(session({
  secret: "I love kids",
  resave: false,
  saveUninitialized: false
}));
app.use(auth.authenticateUser)
const dbFunctions =  require('./database.js')

app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, './public/html/login.html')
    res.sendFile(filePath)
})

app.post('/oJs5Mr1uPxFXVbP2TzWS5SahD', (req, res) =>{
    const {username, password} = req.body
    const promise = dbFunctions.getUser(username)
    promise.then(user => {
      const result = bcrypt.compare(password, user.password)
      if(result){
        req.session.user = user
        res.redirect('/home')
      }else{
        res.send("Shet")
      }
    }).catch(err => {
      console.log(err)
    })
})



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

app.get('/scripts/req_task.js', (req, res) => {
  const filePath = path.join(__dirname, './public/scripts/req_task.js')
  res.sendFile(filePath)
})

app.get('/scripts/show_done.js', (req, res) => {
  const filePath = path.join(__dirname, './public/scripts/show_done.js')
  res.sendFile(filePath)
})

app.get('/scripts/update_status.js', (req, res) => {
  const filePath = path.join(__dirname, './public/scripts/update_status.js')
  res.sendFile(filePath)
})
 
app.get('/all_tasks', (req, res) => {
  const promise = dbFunctions.getAllTaskNames()
  promise.then(result => {
    res.send(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
  })

})

app.post('/task', (req, res) => {
    const task_name = req.body.task_name
    const promise = dbFunctions.getTask(task_name)
    promise.then(result => {
      res.send(JSON.stringify(result))
    }).catch(err => {
      console.log(err)
    })

})

app.post('/update_status', (req, res) => {
  const taskName = req.body.toUpdate;
  dbFunctions.updateTaskStatus(taskName)
  res.send("succesfull status update")
})

app.post('/add', (req, res) => {
    const task = req.body;
    dbFunctions.addTask(task)
    res.send('Received the response!');
  });

  app.post('/del', (req,res) => {
    const task = req.body
    dbFunctions.deleteTask(task.toDelete)
    res.send('ok')
  })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});