        
        const addTask = () => {
            const newTaskInputBox = document.getElementById('newTaskInputBox')
            
            if(newTaskInputBox.style.display === "none"){
                newTaskInputBox.style.display = "block";
            }else{
                const inputTaskName = document.getElementById('inputTaskName')
                const inputDescription = document.getElementById('inputDescription')
                const inputDeadline = document.getElementById('inputDeadLine')

                const task_name = inputTaskName.value;
                const task_description = inputDescription.value;
                const task_deadline = inputDeadline.value;

                console.log(task_name, task_deadline, task_description)
                if(task_name === null || task_description === null || task_deadline === null){
                    console.log("kwo stawa we")
                }
                console.log("object is being sent")
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/add');
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        console.log(xhr.response); // Log the response from the server
                    }
                };
                newTaskInputBox.style.display = "none" 
                const task_obj = {task_name: task_name, deadline: task_deadline, description: task_description}
                console.log(task_obj)
                xhr.send(task_obj);
                }
        }
        
        const deleteTask = () => {
            var inputElement = document.getElementById('textInput');
            var userInput = inputElement.value;
            console.log(userInput);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/add');
            xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.response); // Log the response from the server
            }
            };
            xhr.send(userInput);
        }
        
        /*        
        function write(text){
            // Get the element with the ID "myHeading"
            var headingElement = document.getElementById("myHeading");

            // Change the text content of the element
            headingElement.textContent = text;
        }

        const get = () => {
            fetch('/get', {
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
            .then(response => {
                write(response.data)
            })
        }

        const add = () => {
            var inputElement = document.getElementById('textInput');
            var userInput = inputElement.value;
            console.log(userInput);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/add');
            xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.response); // Log the response from the server
            }
            };
            xhr.send(userInput);           
        }

        const show = () => {
            let textInputContainer = document.getElementById('textInputContainer')
            textInputContainer.style.display = textInputContainer.style.display == 'none' ? 'block' : "none"
        }*/
