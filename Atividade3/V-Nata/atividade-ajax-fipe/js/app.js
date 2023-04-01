let apiUrl         = "https://parallelum.com.br/fipe/api/v1/{VEHICLE}"
let endpointMarcas = endpointModels = endpointAnos = endpointValoresModal = ''

const listaDeVeiculos  = document.getElementById('vehicles_types')
const listaDeMarcas  = document.getElementById("vehicles_brand")
const listaDeModelos = document.getElementById("vehicles_model")
const listaDeAnos    = document.getElementById("vehicles_year")

const botaoDeBusca   = document.querySelector('.search_button')
const modalPreco     = document.querySelector('.modal')
const botaoFechar    = modalPreco.querySelector('.close')

const defaultOption  = '<option disabled selected></option>'

listaDeVeiculos.addEventListener("click", (event) => {
  const tiposPermitidos = ['carros', 'motos', 'caminhoes']
  const tipoVeiculoAtual = event.target.dataset.type || event.target.parentElement.dataset.type

  if (!tiposPermitidos.includes(tipoVeiculoAtual)) return

  atualizarTipoDoVeiculo(tipoVeiculoAtual, event.target)
  buscarPorTipoVeiculo(tipoVeiculoAtual)
  visibilidadeDoBotao()
})

listaDeMarcas.addEventListener("change", (event) => {
  const opcaoAtual = event.target.value
  if (!opcaoAtual) return 
  
  reiniciarCampoEspecifico('modelo')
  reiniciarCampoEspecifico('ano')
  
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
  const modelId = event.target.value
  if (!modelId) return 
  reiniciarCampoEspecifico('ano')

  const marcaId = listaDeMarcas.options[listaDeMarcas.selectedIndex].value
  let endpoint = endpointAnos.replace("{MARCA_ID}", marcaId)
  endpoint = endpoint.replace("{MODEL_ID}", modelId)

  realizarRequisicao(endpoint)
  .then(response => {
    response.forEach(ano => {
      const novoAno = document.createElement("option")
      novoAno.value = ano.codigo
      novoAno.innerText = ano.nome
      listaDeAnos.appendChild(novoAno)
    })

    listaDeAnos.removeAttribute("disabled")
  })
})

listaDeAnos.addEventListener('change', visibilidadeDoBotao)

botaoDeBusca.addEventListener('click', () => {
  const marcaId = listaDeMarcas.options[listaDeMarcas.selectedIndex].value
  const modelId = listaDeModelos.options[listaDeModelos.selectedIndex].value
  const anoId   = listaDeAnos.options[listaDeAnos.selectedIndex].value
  const testYear = /([0-9]{4})-([0-9]{1})/

  if (!(isNumber(marcaId) && isNumber(modelId) && anoId.length && testYear.test(anoId)))
    return 

  limparDadosModal()

  let endpoint = endpointValoresModal.replace("{MARCA_ID}", marcaId)
  endpoint = endpoint.replace("{MODEL_ID}", modelId)
  endpoint = endpoint.replace("{YEAR_ID}", anoId)

  realizarRequisicao(endpoint)
  .then(response => {
    modalPreco.querySelector('.vehicle_name').innerText = response.Modelo
    modalPreco.querySelector('.price').innerText = response.Valor

    modalPreco.querySelector('.reference_month .value').innerText = response.MesReferencia
    modalPreco.querySelector('.fipe_code .value').innerText = response.CodigoFipe
    modalPreco.querySelector('.brand .value').innerText = response.Marca
    modalPreco.querySelector('.year .value').innerText = response.AnoModelo

    modalPreco.classList.remove('hide_modal')
  })

})

botaoFechar.addEventListener('click', () => {
  modalPreco.classList.add('hide_modal')
})

function realizarRequisicao(endpoint) {
  return fetch(endpoint).then(response => response.json())
}

function buscarPorTipoVeiculo() {
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
}

function atualizarTipoDoVeiculo(type, target) {
  apiUrl = apiUrl.replace(/{VEHICLE}|carros|motos|caminhoes/, type)
  endpointMarcas = `${apiUrl}/marcas`
  endpointModels = `${endpointMarcas}/{MARCA_ID}/modelos`
  endpointAnos   = `${endpointModels}/{MODEL_ID}/anos`
  endpointValoresModal = `${endpointAnos}/{YEAR_ID}`

  atualizarVeiculoAtivo(target)
}

function atualizarVeiculoAtivo(target) {
  document.querySelector('[data-type="caminhoes"]').classList.remove('active')
  document.querySelector('[data-type="carros"]').classList.remove('active')
  document.querySelector('[data-type="motos"]').classList.remove('active')
  
  reiniciarTodosOsCampos()

  if (target.dataset.type) {
    target.classList.add('active')
    return
  }

  target.parentElement.classList.add('active')
}

function reiniciarTodosOsCampos() {
  listaDeMarcas.setAttribute('disabled', true)
  listaDeModelos.setAttribute('disabled', true)
  listaDeAnos.setAttribute('disabled', true)

  listaDeMarcas.innerHTML = defaultOption
  listaDeModelos.innerHTML = defaultOption
  listaDeAnos.innerHTML = defaultOption
}

function reiniciarCampoEspecifico(campo = 'marca') {
  switch(campo) {
    case 'marca':
      listaDeMarcas.setAttribute('disabled', true)
      listaDeMarcas.innerHTML = defaultOption
      break;
    
    case 'modelo':
      listaDeModelos.setAttribute('disabled', true)
      listaDeModelos.innerHTML = defaultOption

    case 'ano':
      listaDeAnos.setAttribute('disabled', true)
      listaDeAnos.innerHTML = defaultOption
  }
}

function visibilidadeDoBotao() {
  if (listaDeAnos.length <= 1 && listaDeMarcas.length <= 1 && listaDeModelos.length <= 1) {
    botaoDeBusca.style.cursor = 'default'
    botaoDeBusca.style.opacity = 0.2
    return
  }

  botaoDeBusca.style.cursor = 'pointer'
  botaoDeBusca.style.opacity = 100
}

function limparDadosModal() {
  modalPreco.querySelector('.vehicle_name').innerText = ''
  modalPreco.querySelector('.price').innerText = ''
  modalPreco.querySelector('.reference_month .value').innerText = ''
  modalPreco.querySelector('.fipe_code .value').innerText = ''
  modalPreco.querySelector('.brand .value').innerText = ''
  modalPreco.querySelector('.year .value').innerText = ''
}

function isNumber(variable) {
  return !isNaN(variable)
}