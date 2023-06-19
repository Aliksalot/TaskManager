
const write_all_tasks = () => {
    fetch('/all_tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Request failed.'); // handle non-2xx HTTP response status
        }
        return response.json(); // parse response data as JSON
    })
    .then(names => {
        const buttonBox = document.getElementById('taskDisplayBox')
        buttonBox.innerHTML = ''
        console.log("SHOWDONE", sessionStorage.getItem('showDone'))
        buttonBox.className = sessionStorage.getItem('showDone')
        showDoneButton.textContent = buttonBox.className === "NODONE" ? "Show all tasks" : 'Hide finished tasks'
        
        names.forEach(task => {
            
            const button = document.createElement('button')   

            const buttonWidth = '200px'
            const buttonHeight = '40px'
            const buttonFontSize = '20px' 
            const distToNext = '100px'

            button.textContent = task.task_name
            button.id = task.task_name
            button.className = 'tasks'
            button.style.display = 'block'
            button.style.marginBottom = distToNext
            button.style.width = buttonWidth
            button.style.height = buttonHeight
            button.style.fontSize = buttonFontSize

            const taskDescription = document.createElement('div')
            taskDescription.id = "for" + task.task_name
            taskDescription.style.marginLeft = '5px'
            taskDescription.style.marginTop = '20px'
            taskDescription.style.maxWidth = '300px'

            button.appendChild(taskDescription)

            switch(task.status){
                case 0: break;
                case 1: button.style.backgroundColor = 'yellow';break;
                case 2: button.style.backgroundColor = 'green';
                if(buttonBox.className === 'NODONE')
                    button.style.display = 'none'
                break;
            }

            button.addEventListener('click', () => {
                //show description for task
                taskDescription.textContent === '' || taskDescription.textContent === null ? req_task(button.id) : taskDescription.textContent = ''
            })

            button.addEventListener('contextmenu', (click) =>{
                //click once to mark task as started, click twice to mark task as done
                click.preventDefault()
                update_status(button)
            })

                console.log(button.style.display);
                buttonBox.appendChild(button);
                
        });



    })
}

write_all_tasks()