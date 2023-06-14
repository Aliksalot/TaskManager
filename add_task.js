const addTask = () => {
    const newTaskInputBox = document.getElementById('newTaskInputBox')
    
    console.log(newTaskInputBox.style.display);
    if(newTaskInputBox.style.display === "none"){
        newTaskInputBox.style.whiteSpace = 'pre-line';
        newTaskInputBox.style.display = "block";
        console.log("Hello")
    }else{
        const inputTaskName = document.getElementById('inputTaskName')
        const inputDescription = document.getElementById('inputDescription')
        const inputDeadline = document.getElementById('inputDeadLine')

        const taskName = inputTaskName.value;
        const task_description = inputDescription.value;
        const task_deadline = inputDeadline.value;

        inputTaskName.value = "";
        inputDeadline.value = "";
        inputDescription.value = "";
        if(taskName === null || task_description === null || task_deadline === null || taskName === '' || task_description === '' || task_deadline === ''){
            newTaskInputBox.style.display= "none" 
            return
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/add');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.response); // Log the response from the server
            }
        };
        newTaskInputBox.style.display = "none" 
        const task_obj = {task_name: taskName, description: task_description, deadline: task_deadline}
        
        xhr.send(JSON.stringify(task_obj));
        }
}

