const button = document.querySelector('#create-task')
const task = document.querySelector('#task')
const listTasks = document.querySelector('#list-tasks')
const containerTasks = document.querySelector('#container-tasks')

button.addEventListener('click', () => {
    if(task.value) {
        const li = document.createElement("li")
        li.innerHTML = task.value
        li.classList.add('list-group-item')
        listTasks.prepend(li)
        containerTasks.classList.remove('d-none')
        task.value = ''
    }
})

task.addEventListener('keypress', (e) => {
    if(task.value && e.key === 'Enter') {
        const li = document.createElement("li")
        li.innerHTML = task.value
        li.classList.add('list-group-item')
        listTasks.prepend(li)
        containerTasks.classList.remove('d-none')
        if (e.key === 'Enter') {
            task.value = ''
        }
    }
})

listTasks.addEventListener('click', (e) => {
    if(e.target.nodeName == 'LI' ) {
        e.target.classList.toggle('active')
    }
})