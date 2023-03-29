const button = document.querySelector("#btn-add")
const input = document.querySelector("#input-form")
const task = document.querySelector("#task")
const listTasks = document.querySelector("#list-tasks")

input.addEventListener("keypress", (event) => {
    if(event.key === 'Enter' && input.value.trim()){
        addItemlist()
    }
})

button.addEventListener("click", () => {
    if(input.value.trim()){
        addItemlist()
    }
})

listTasks.addEventListener("click", (event) => {
    const itemAtual = event.target

    if(itemAtual.classList.contains("active")){
        itemAtual.classList.remove("active")
    }else {
        itemAtual.classList.add("active")
    }
})

function addItemlist() {
    const newListItem = document.createElement("li")
    newListItem.innerHTML = input.value
    newListItem.classList.add("list-group-item")
    newListItem.style.cursor = "pointer"
    listTasks.prepend(newListItem)
    task.classList.remove('d-none')
    input.value = ""
}