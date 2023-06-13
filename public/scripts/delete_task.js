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