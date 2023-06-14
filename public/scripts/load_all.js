
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
        console.log(names)
        const buttonBox = document.getElementById('taskDisplayBox')
        buttonBox.innerHTML = ''
        names.forEach(task => {
            const button = document.createElement('button')   
            const buttonWidth = '200px'
            const buttonHeight = '40px'
            const buttonFontSize = '20px' 
            const distToNext = '100px'
            button.textContent = task
            button.id = task
            button.className = 'tasks'
            button.style.display = 'block'
            button.style.marginBottom = distToNext
            button.style.width = buttonWidth
            button.style.height = buttonHeight
            button.style.fontSize = buttonFontSize

            const taskDescription = document.createElement('div')
            taskDescription.id = "for" + task
            taskDescription.style.marginLeft = '5px'
            taskDescription.style.marginTop = '20px'
            taskDescription.style.maxWidth = '300px'
            button.appendChild(taskDescription)

            button.addEventListener('click', () => {
                taskDescription.textContent === '' || taskDescription.textContent === null ? req_task(button.id) : taskDescription.textContent = ''
            })

            buttonBox.appendChild(button);
        });



    })
}

write_all_tasks()