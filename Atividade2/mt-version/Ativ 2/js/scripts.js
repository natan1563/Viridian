const ul = document.querySelector('ul')
const botao = document.querySelector("#botao")
const input = document.querySelector('input')

botao.addEventListener("click", function(){
    if(input.value.trim()){
        const novoItem = document.createElement("li")
        novoItem.innerText = input.value.trim()
        novoItem.classList.add("list-group-item")
        novoItem.style.cursor = "pointer"

        ul.appendChild(novoItem)
        ul.classList.remove("d-none")
        input.value = ""
    }
})
input.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        botao.click()
    }
})
ul.addEventListener("click", function(event){
    const itemAtual = event.target
    if(itemAtual.classList.contains("active")){
        itemAtual.classList.remove("active")
    }else{
        itemAtual.classList.add("active")
    }
})