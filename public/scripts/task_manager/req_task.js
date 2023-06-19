
const req_task = (taskName) =>{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/task');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const task_descr = document.getElementById('for' + taskName)
            const task = JSON.parse(xhr.responseText)[0]
            task_descr.textContent = task.description + '\n' + "Deadline: " + task.deadline
            
        }
    };
    
    xhr.send(JSON.stringify({task_name: taskName}));

}