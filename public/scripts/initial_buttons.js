
        
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
