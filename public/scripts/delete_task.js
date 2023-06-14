        
        
        
        const deleteTask = () => {

            const inputDiv = document.getElementById('deleteTaskInputBox')

            if(inputDiv.style.display === 'none'){
                inputDiv.style.display = 'block'
                inputDiv.style.whiteSpace = 'pre-line'
                const newTaskInputBox = document.getElementById('newTaskInputBox')
                newTaskInputBox.style.display = 'none'
            }else{

                const inputField = document.getElementById('inputTaskToDelete')
                const taskName = inputField.value
            
                inputField.value = ""
                inputDiv.style.display = 'none'

                if(taskName === null || taskName === ''){
                    inputDiv.style.display = 'none'
                    return
                }

                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/del');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        console.log(xhr.response); // Log the response from the server
                        write_all_tasks()
                    }
                };
                
                xhr.send(JSON.stringify({toDelete: taskName}));
            }
            


        }