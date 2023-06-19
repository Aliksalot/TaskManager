
const update_status = (button) =>{ 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/update_status');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response); // Log the response from the server
            location.reload()
        }
    };
    xhr.send(JSON.stringify({toUpdate: button.id}));
}