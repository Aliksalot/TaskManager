const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require("path")
const app = express();
const port = 3000
const auth = require('./auth.js')

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public'));
app.use(session({
  secret: "I love kids",
  resave: false,
  saveUninitialized: false
}));
app.use(auth.authenticateUser);

const dbFunctions =  require('./database.js');
//debug function to clear the database
//dbFunctions.clear()

//login, logout, register

//login
app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, './public/html/login.html')
    res.sendFile(filePath)
})

app.get('/scripts/login/send_login_info.js', (req, res) => {
    const filePath = path.join(__dirname, './public/scripts/login/send_login_info.js')
    res.sendFile(filePath)
})



app.post('/oJs5Mr1uPxFXVbP2TzWS5SahD', (req, res) =>{

    const user = req.body
    console.log(user)
    const username = user.username
    const password = user.password
    console.log("USERNAME, PASSWORD: ", username, password)
    const promise = dbFunctions.getUser(username)
    promise.then(_user => {
          if(_user === null){
            res.send(false)
            return
          }
          bcrypt.compare(password, _user.password, (err, result) =>{
          console.log("RECIEVED FROM SERV", _user)
          console.log("BCRYPT RESULT: ", result)
          if(result && !err){
            req.session.user = _user
            console.log("TAM DET PRIEMA", req.session.user)
            res.send(true)
          }else{
             res.send(false)
          }		
          })
    })
})
//logout
app.get('/scripts/login/logout.js', (req, res) => {
  const filePath = path.join(__dirname, './public/login/scripts/logout.js')
  res.sendFile(filePath)
})
app.post('/logout', (req,res) =>{
  req.session.user = undefined
  res.send("logout")
})
//register
app.get('/scripts/register/send_new_user.js', (req, res) => {
  const filePath = path.join(__dirname, './public/scripts/register/send_new_user.js')
  res.sendFile(filePath)
})
app.get('/register', (req, res) => {
  const filePath = path.join(__dirname, './public/html/register.html')
  res.sendFile(filePath)
})

const encrpt = async(password) => {
  console.log("password to encrpt: ", password)
  return new Promise(async(resolve, reject) =>{
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
  
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("encrypted before return: ", hashedPassword)
      resolve(hashedPassword)
    } catch (error) {
      reject(error)
    }
  })
}

app.post('/new_user', async(req, res) =>{
    console.log("Checking is user avaliable")
    const accountAvaliablePromise = dbFunctions.checkUserAvaliable(req.body.username)
    accountAvaliablePromise.then(async result =>{
      if(!result){
        res.send(result)
      }else{
          if(req.body.password === undefined){
              res.send(false)
              return
          }
          console.log("Name avaliable - creating user")
          const encrypt_pass_promise = encrpt(req.body.password)
          encrypt_pass_promise.then(hashPass =>{
            const accountCreatedPromise = dbFunctions.newUser({username: req.body.username, password: hashPass})
            accountCreatedPromise.then(result =>{
              res.send(result)
            })
          })
        

      }
    }).catch(err => {
      console.log(err)
    }) 

    
})


//task_handling

//loading all neccesery files
app.get('/home', (req, res) => {
  const filePath = path.join(__dirname, './public/html/home.html')
  res.sendFile(filePath);
});

app.get('/task_manager/scripts/add_task.js', (req, res) => {
    const filePath = path.join(__dirname, './public/task_manager/scripts/add_task.js')
    res.sendFile(filePath)
})

app.get('/scripts/delete_task.js', (req, res) => {
    const filePath = path.join(__dirname, './public/task_manager/scripts/delete_task.js')
    res.sendFile(filePath)
})

app.get('/scripts/req_task.js', (req, res) => {
  const filePath = path.join(__dirname, './public/task_manager/scripts/req_task.js')
  res.sendFile(filePath)
})

app.get('/scripts/show_done.js', (req, res) => {
  const filePath = path.join(__dirname, './public/task_manager/scripts/show_done.js')
  res.sendFile(filePath)
})

app.get('/scripts/update_status.js', (req, res) => {
  const filePath = path.join(__dirname, './public/task_manager/scripts/update_status.js')
  res.sendFile(filePath)
})

//code lol
app.get('/all_tasks', (req, res) => {
  const promise = dbFunctions.getAllTaskNames(req.session.user)
  promise.then(result => {
    res.send(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
  })

})

app.post('/task', (req, res) => {
    const task_name = req.body.task_name
    const promise = dbFunctions.getTask(task_name, req.session.user)
    promise.then(result => {
      res.send(JSON.stringify(result))
    }).catch(err => {
      console.log(err)
    })

})

app.post('/update_status', (req, res) => {
  const taskName = req.body.toUpdate;
  dbFunctions.updateTaskStatus(taskName, req.session.user)
  res.send("succesfull status update")
})

app.post('/add', (req, res) => {
    const task = req.body;
    dbFunctions.addTask(task, req.session.user)
    res.send('Received the response!');
  });

  app.post('/del', (req,res) => {
    const task = req.body
    dbFunctions.deleteTask(task.toDelete, req.session.user)
    res.send('ok')
  })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

