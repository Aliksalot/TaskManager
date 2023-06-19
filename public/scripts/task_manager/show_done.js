
const show_done = () => {
    const buttonBox = document.getElementById('taskDisplayBox')
    const showDoneButton = document.getElementById('showDoneButton')
    buttonBox.className = buttonBox.className === "NODONE" ? "ALL" : "NODONE"
    showDoneButton.textContent = buttonBox.className === "NODONE" ? "Show all tasks" : 'Hide finished tasks'
    sessionStorage.setItem('showDone', buttonBox.className)
    write_all_tasks()
    console.log(buttonBox.className)
}