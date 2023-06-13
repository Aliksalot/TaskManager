
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
    .then(response => {
        console.log(response)
    })
}

write_all_tasks()