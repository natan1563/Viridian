const texto = document.querySelector('input')
const btnInserir = document.querySelector('.divInserir button')
const btnDelete = document.querySelector('.header button')
const ul = document.querySelector('ul')


var itensLista =[]

ul.addEventListener("click", function(event){
    var item = event.target
    if (item.classList.contains("active")) {
        item.classList.remove("active");
        return
    }

    item.classList.add("active");
});

//função que deleta todos os os itens da lista
btnDelete.onclick = ()=>{
    itensLista = [];
    updateLista();
}

// quando for diferença de vazio ele vai chamar a função
texto.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && texto.value != '') {
        setItemBD()
    }
})


// se tiver vazio a função add vai chamar o setItemBD 
btnInserir.onclick = function(){
    if (texto.value != '') {
        setItemBD()
    }
}


//funcao add, verifica tamanho maximo e minimo
function setItemBD(){
        itensLista.push({ 'item': texto.value})
        updateLista();
}

// essa funcão coloca no banco o item, adiciona a lista de itens no localstorage e depois chama carrecar lista
function updateLista(){
    localStorage.setItem('todoList', JSON.stringify(itensLista))
    carregarLista()
}


function carregarLista(){
    ul.innerHTML =""; //limpar a minha UL

    itensLista = JSON.parse(localStorage.getItem('todoList')) ?? []  // vamos pegar do banco para adicionar na lista itens
    itensLista.forEach((i) =>{            
        inserirItemTela(i);
    } )
}


function inserirItemTela(i){

    if (i.item.length > 50 ) {
        alert("Limite máximo de 50 caracteres");
        return
    } else {
        const li = document.createElement('li')
        li.innerHTML =`<div class="divLi"> <span class="btn btn-outline-primary" data data-i=${i}>${i.item}</span>
    
        </div>`;
        ul.appendChild(li)
        texto.value = '';
    }

}






