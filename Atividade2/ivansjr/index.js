const button = document.querySelector('#create-task')
const task = document.querySelector('#task')
const listTasks = document.querySelector('#list-tasks')
const containerTasks = document.querySelector('#container-tasks')

button.addEventListener('click', () => {
    if(task.value) {
        addedItemInList()
    }
})

task.addEventListener('keypress', (e) => {
    if(task.value && e.key === 'Enter') {
        addedItemInList()
    }
})

listTasks.addEventListener('click', (e) => {
    if(e.target.nodeName === 'LI' ) {
        e.target.classList.toggle('active')
    }
})

function addedItemInList() {
    const li = document.createElement("li")
    li.innerHTML = task.value
    li.classList.add('list-group-item')
    listTasks.prepend(li)
    containerTasks.classList.remove('d-none')
    task.value = ''
}
