const baseUrl = "https://parallelum.com.br/fipe/api/v1"
const endpointMarcas = `${baseUrl}/carros/marcas`
const endpointModels = `${baseUrl}/carros/marcas/{MARCA_ID}/modelos`
const endpointAnos   = `${baseUrl}/carros/marcas/{MARCA_ID}/modelos/{MODEL_ID}/anos`

const listaDeMarcas  = document.getElementById("vehicles_brand")
const listaDeModelos = document.getElementById("vehicles_model")
const listaDeAnos    = document.getElementById("vehicles_year")

realizarRequisicao(endpointMarcas)
.then(response => {
  response.forEach(marca => {
    const novoItem = document.createElement("option")
    novoItem.value = marca.codigo
    novoItem.innerText = marca.nome
    listaDeMarcas.appendChild(novoItem)
  })

  listaDeMarcas.removeAttribute("disabled")
})

listaDeMarcas.addEventListener("change", (event) => {
  const opcaoAtual = event.target.value
  if (!opcaoAtual) return 

  realizarRequisicao(endpointModels.replace("{MARCA_ID}", opcaoAtual))
  .then(response => {
    if (!'modelos' in response) throw new Error('Request falhou')

    response.modelos.forEach(modelo => {
      const novoModelo = document.createElement("option")
      novoModelo.value = modelo.codigo
      novoModelo.innerText = modelo.nome
      listaDeModelos.appendChild(novoModelo)
    })

    listaDeModelos.removeAttribute("disabled")
  })
})

listaDeModelos.addEventListener("change", (event) => {
  const opcaoAtual = event.target.value
  if (!opcaoAtual) return 

  const modelId = listaDeMarcas.options[listaDeMarcas.selectedIndex].value
  debugger
  let endpoint = endpointAnos.replace("{MARCA_ID}", opcaoAtual)
  endpoint = endpoint.replace("{MODEL_ID}", modelId)

  console.log(endpoint)
  realizarRequisicao(endpoint)
  .then(response => {
    console.log(response)
    response.forEach(ano => {
      const novoAno = document.createElement("option")
      novoAno.value = ano.codigo
      novoAno.innerText = ano.nome
      listaDeAnos.appendChild(novoAno)
    })

    listaDeAnos.removeAttribute("disabled")
  })
})

function realizarRequisicao(endpoint) {
  return fetch(endpoint).then(response => response.json())
}