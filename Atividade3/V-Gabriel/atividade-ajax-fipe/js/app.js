const baseUrl = "https://parallelum.com.br/fipe/api/v1/"
const endpointMarcas = `${baseUrl}carros/marcas`

// http://deividfortuna.github.io/fipe/

// var element = document.getElementById("myDIV");
// element.classList.toggle("mystyle");

const marcasList = document.querySelector("#vehicles_brand")
marcasList.innerHTML = ""
var marcas = [];

// fetch(endpointMarcas)
//     .then((response) => response.json())
//     .then((data) => {
//         data.map((item) => {
//             let listItem = document.createElement("option")
//             listItem.innerText = item.nome
//             marcasList.appendChild(listItem)
//         })
//     })
var selectVehicles = document.querySelectorAll('.inative')
var vTypes = document.getElementById('#vehicles_types')
var count = 0

selectVehicles.forEach((b, i) => {
    b.addEventListener("click", (e) => {
        marcasList.setAttribute('disabled',true)
        console.log(e.target);
        var types = ''

        if (b.getAttribute('data-type') == 'motos') {
           
            types = 'motos'
            b.classList.remove('inative')
            b.classList.toggle('active')
            selectVehicles[1].classList.remove('active')
            selectVehicles[2].classList.remove('active')
            this.brands(types)    

        }
        else if (b.getAttribute('data-type') == 'caminhoes') {
            types = 'caminhoes'
            b.classList.remove('inative')
            b.classList.toggle('active')
            selectVehicles[0].classList.remove('active')
            selectVehicles[2].classList.remove('active')
            this.brands(types)
        }
        else if (b.getAttribute('data-type') == 'carros') {
            types = 'carros'
            b.classList.remove('inative')
            b.classList.toggle('active')
            selectVehicles[0].classList.remove('active')
            selectVehicles[1].classList.remove('active')
            this.brands(types)
        }
    })
})
async function brands(types){

  return  fetch(`${baseUrl}${types}/marcas`)
                .then((response) => response.json())
                .then((data) => {
                    data.map((item) => {
                      listItem = document.createElement("option")
                        listItem.innerText = item.nome
                        marcasList.appendChild(listItem)
                        marcasList.removeAttribute('disabled')
                    })
                })
}
