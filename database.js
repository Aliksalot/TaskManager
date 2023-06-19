const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb+srv://alexkolev05:1234@eentai.ou01tyv.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'TaskManager';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
async function addTask(task){ 
    if(task.task_name === null || task.description === null || task.deadline === null || task.completed === null)
        return false;
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

async function deleteTask(taskName){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    console.log('deleting task')
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');

        const query = {task_name: taskName}

        const result = await collection.deleteMany(query)
        console.log()
        return result.deletedCount > 0 ? true : false
    }catch(e){
        console.log(e)
        return false;
    }

}

async function getTask(taskName){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    console.log('getting all')
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');

        const query = {task_name : taskName}

        const result = await collection.find(query).toArray()
        return result
    }catch(e){
        console.log(e)
    }  
}

async function getAllTaskNames(){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    console.log('getting all')
    return new Promise(async(resolve, reject) => {
        try{
            const db = client.db(dbName);
            const collection = db.collection('tasks');
    
            const result = await collection.find({}).toArray()
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

async function updateTaskStatus(taskName){
    const con = await client.connect()
    console.log('Connected successfully to the MongoDB server');
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');
    
        const result = await collection.find({task_name: taskName}).toArray()
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
    console.log('Connected successfully to the MongoDB server');
    console.log('getting all')
    try{
        const db = client.db(dbName);
        const collection = db.collection('tasks');

        const result = await collection.deleteMany();
        
    }catch(e){
        console.log(e)
    } 
}

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


module.exports = {
    addTask,
    deleteTask,
    getAllTaskNames,
    getTask,
    updateTaskStatus,
    clear,
    getUser
};
