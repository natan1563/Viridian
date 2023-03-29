const button = document.getElementById("button");
const list = document.querySelector(".list-group");
const task = document.querySelector("#task");

button.addEventListener('click', () => {
    if(task.value.trim()) {
        addedItemInList(task.value)
    }
})

function addedItemInList (texto){
    const li = document.createElement("li")
    li.innerText = texto
    li.classList.add("list-group-item")
    list.appendChild (li)
    list.classList.remove("d-none")
}

task.addEventListener("keypress", (event) => {
    if(event.key === 'Enter'){
        button.click()
    }
})

list.addEventListener('click', (event) =>{
    const item = event.target
    if(item.classList.contains("active")){
        item.classList.remove("active")
    }else{
        item.classList.add("active")
    }
})
