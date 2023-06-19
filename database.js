const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb+srv://alexkolev05:1234@eentai.ou01tyv.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'TaskManager';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
async function addTask(task, user){ 
    if(task.task_name === null || task.description === null || task.deadline === null || task.completed === null)
        return false;
    task.owner = user.username
    console.log("TASK OWNER STATUS: ", user.username, task.owner)
    console.log(task.task_name)
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');
        
        collection.insertOne(task);
    }catch(e){
        console.log(e)
        return false;
    }
    return true;
}

async function deleteTask(taskName, user){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    console.log('deleting task')
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');

        const query = {task_name: taskName, owner: user.username}

        const result = await collection.deleteMany(query)
        console.log()
        return result.deletedCount > 0 ? true : false
    }catch(e){
        console.log(e)
        return false;
    }

}

async function getTask(taskName, user){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    console.log('getting all')
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');

        const query = {task_name : taskName, owner: user.username}

        const result = await collection.find(query).toArray()
        return result
    }catch(e){
        console.log(e)
    }  
}

async function getAllTaskNames(user){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    console.log('getting all')
    return new Promise(async(resolve, reject) => {
        try{
            const db = client.db(dbName);
            const collection = db.collection('tasks');
    
            const result = await collection.find({owner: user.username}).toArray()
            let names = []
            result.forEach(taskName => {
                names.push({task_name : taskName.task_name, status: taskName.status})
            });
            console.log("sending task names from db")
            resolve(names)
        }catch(e){
            reject(e)
        }
    })
      
}

async function updateTaskStatus(taskName, user){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');
    
        const result = await collection.find({task_name: taskName, owner: user.username}).toArray()
        console.log("WHAT I SEARCHED FOR",taskName)
        console.log("WHAT I GOT FROM DB", result[0].status)
        const cur_status = result[0].status
        const new_status = cur_status === 2 ? 0 : cur_status + 1
        const filter = { task_name: taskName };
        const update = { $set: { status: new_status } }; 

        collection.updateOne(filter, update)
        console.log("sending task names from db")
        }catch(e){
            console.log(e)
    }
}

async function clear(){
    const con = await client.connect()
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');
        const collection1 = db.collection('users')
        const result1 = await collection1.deleteMany();
        const result = await collection.deleteMany();
        
    }catch(e){
        console.log(e)
    } 
}

//functions for accounts

async function getUser(username){
    const con = await client.connect()
    const users_collection_name = 'users'
    console.log('Connection succesful');
    return new Promise(async(resolve, reject) => {

        try{
        const db = client.db(dbName);
        const collection = db.collection(users_collection_name);

        const query = {username : username}

        const result = await collection.findOne(query)
        console.log("SENT SUCCES")
        resolve(result)
    	}catch(e){
    		console.log("SENT FAIL")
        	reject(e)
    	} 

    })    
}

async function newUser(user){
    console.log(user.username)
    console.log(user.password)
    const con = await client.connect()
    return new Promise(async(resolve, reject) => {
        if(user.username === undefined || user.password === undefined)
            resolve(false)
        try{
            console.log("inserting user into db")
            const db = client.db(dbName);
            const collection = db.collection('users');
            
            collection.insertOne(user);
        }catch(e){
            console.log(e)
            resolve(false)
        }
        resolve(true)
    })
    
}

async function checkUserAvaliable(username){
    if(username === undefined)
        return false;
    const con = await client.connect()
    return new Promise(async(resolve, reject) => {
        try{
            const db = client.db(dbName);
            const collection = db.collection('users');
            
            const checkExists = await collection.findOne({username: username})
    
            resolve(checkExists === null)
            
        }catch(e){
            reject(e)
        }
        
    })
    
}

module.exports = {
    addTask,
    deleteTask,
    getAllTaskNames,
    getTask,
    updateTaskStatus,
    clear,
    getUser,
    newUser,
    checkUserAvaliable
};
