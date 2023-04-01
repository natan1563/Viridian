const baseUrl = "https://parallelum.com.br/fipe/api/v1/"

const endpointCarros = `${baseUrl}carros/marcas`
const endpointMotos = `${baseUrl}motos/marcas`
const endpointCaminhoes  = `${baseUrl}caminhoes/marcas`

const endpointCarrosModel = `${endpointCarros}/{MARCA_ID}/modelos`
const endpointMotosModel = `${endpointMotos}/{MARCA_ID}/modelos`
const endpointCaminhoesModel = `${endpointCaminhoes}/{MARCA_ID}/modelos`

const endpointCarrosYear = `${endpointCarros}/{MARCA_ID}/modelos/{MODELO_ID}/anos`
const endpointMotosYear = `${endpointMotos}/{MARCA_ID}/modelos/{MODELO_ID}/anos`
const endpointCaminhoesYear = `${endpointCaminhoes}/{MARCA_ID}/modelos/{MODELO_ID}/anos`

const endpointCarrosValue = `${endpointCarros}/{MARCA_ID}/modelos/{MODELO_ID}/anos/{ANO_ID}`
const endpointMotosValue = `${endpointMotos}/{MARCA_ID}/modelos/{MODELO_ID}/anos/{ANO_ID}`
const endpointCaminhoesValue = `${endpointCaminhoes}/{MARCA_ID}/modelos/{MODELO_ID}/anos/{ANO_ID}`

const marcasList = document.querySelector("#vehicles_brand")
const modeloList = document.querySelector("#vehicles_model")
const anoList = document.querySelector("#vehicles_year")

const imgMoto = document.querySelector("#motos")
const imgCaminhao = document.querySelector("#caminhoes")
const imgCarro = document.querySelector("#carros")

const defaultOption  = '<option disabled selected></option>'

const btnBuscar = document.querySelector("#btn-buscar")
const modal = document.querySelector("#modal")
const btnClose = document.querySelector("#close")

if(imgMoto) {
    imgMoto.addEventListener('click', () => {
        marcasList.innerHTML = ""
        modeloList.innerHTML = ""
        anoList.innerHTML = ""

        imgMoto.classList.add("active")
        imgCaminhao.classList.remove("active")
        imgCarro.classList.remove("active")

        fetch(endpointMotos)
            .then((response) => response.json())
            .then((data) => {
                marcasList.innerHTML = defaultOption
                data.map((marca) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = marca.nome
                    listItem.value = marca.codigo

                    marcasList.appendChild(listItem)
                    marcasList.removeAttribute("disabled")
                })
            })
    })
}

if(imgCaminhao) {
    imgCaminhao.addEventListener('click', () => {
        marcasList.innerHTML = ""
        modeloList.innerHTML = ""
        anoList.innerHTML = ""

        imgCaminhao.classList.add("active")
        imgCarro.classList.remove("active")
        imgMoto.classList.remove("active")

        fetch(endpointCaminhoes)
            .then((response) => response.json())
            .then((data) => {
                marcasList.innerHTML = defaultOption
                data.map((marca) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = marca.nome
                    listItem.value = marca.codigo

                    marcasList.appendChild(listItem)
                    marcasList.removeAttribute("disabled")
                })
            })
    })
}

if(imgCarro) {
    imgCarro.addEventListener("click", () => {
        marcasList.innerHTML = ""
        modeloList.innerHTML = ""
        anoList.innerHTML = ""

        imgCarro.classList.add("active")
        imgMoto.classList.remove("active")
        imgCaminhao.classList.remove("active")

        fetch(endpointCarros)
            .then((response) => response.json())
            .then((data) => {
                marcasList.innerHTML = defaultOption
                data.map((marca) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = marca.nome
                    listItem.value = marca.codigo

                    marcasList.appendChild(listItem)
                    marcasList.removeAttribute("disabled")
                })
            })
    })
}

marcasList.addEventListener("change", (event) => {
    const marcaAtual = event.target.value
    modeloList.innerHTML = ""
    anoList.innerHTML = ""
    
    if(!marcaAtual) {
        return 
    }

    if(imgMoto.classList.contains("active")) {
        fetch(endpointMotosModel.replace("{MARCA_ID}", marcaAtual))
            .then((response) => response.json())
            .then((data) => {
                modeloList.innerHTML = defaultOption
                data.modelos.map((modelo) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = modelo.nome
                    listItem.value = modelo.codigo

                    modeloList.appendChild(listItem)
                    modeloList.removeAttribute("disabled")
                })
            })
    }

    if(imgCaminhao.classList.contains("active")) {
        fetch(endpointCaminhoesModel.replace("{MARCA_ID}", marcaAtual))
            .then((response) => response.json())
            .then((data) => {
                if(!"modelos" in data) {
                    return
                }
                modeloList.innerHTML = defaultOption
                data.modelos.map((modelo) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = modelo.nome
                    listItem.value = modelo.codigo

                    modeloList.appendChild(listItem)
                    modeloList.removeAttribute("disabled")
                })
            })
    }

    if(imgCarro.classList.contains("active")) {
        fetch(endpointCarrosModel.replace("{MARCA_ID}", marcaAtual))
            .then((response) => response.json())
            .then((data) => {
                if(!"modelos" in data) {
                    return
                }
                modeloList.innerHTML = defaultOption
                data.modelos.map((modelo) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = modelo.nome
                    listItem.value = modelo.codigo

                    modeloList.appendChild(listItem)
                    modeloList.removeAttribute("disabled")
                })
            })
    }
    
})

modeloList.addEventListener("change", (event) => {
    const modeloAtual = event.target.value
    anoList.innerHTML = ""

    if(!modeloAtual) {
        return
    }

    if(imgMoto.classList.contains("active")) {
        const marcaID = marcasList.options[marcasList.selectedIndex].value
        let endpoint = endpointMotosYear.replace("{MARCA_ID}", marcaID)
            endpoint = endpoint.replace("{MODELO_ID}", modeloAtual)

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                anoList.innerHTML = defaultOption
                data.map((ano) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = ano.nome
                    listItem.value  = ano.codigo

                    anoList.appendChild(listItem)
                    anoList.removeAttribute("disabled")
                })
            })
    }

    if(imgCaminhao.classList.contains("active")) {
        const marcaID = marcasList.options[marcasList.selectedIndex].value
        let endpoint = endpointCaminhoesYear.replace("{MARCA_ID}", marcaID)
            endpoint = endpoint.replace("{MODELO_ID}", modeloAtual)

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                anoList.innerHTML = defaultOption
                data.map((ano) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = ano.nome
                    listItem.value  = ano.codigo

                    anoList.appendChild(listItem)
                    anoList.removeAttribute("disabled")
                })
            })
    }

    if(imgCarro.classList.contains("active")) {
        const marcaID = marcasList.options[marcasList.selectedIndex].value
        let endpoint = endpointCarrosYear.replace("{MARCA_ID}", marcaID)
            endpoint = endpoint.replace("{MODELO_ID}", modeloAtual)

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                anoList.innerHTML = defaultOption
                data.map((ano) => {
                    let listItem = document.createElement("option")
                    listItem.innerHTML = ano.nome
                    listItem.value  = ano.codigo

                    anoList.appendChild(listItem)
                    anoList.removeAttribute("disabled") 
                })
            })
    }

})

anoList.addEventListener("change", (event) => {
    btnBuscar.style.opacity = 1
    const anoAtual = event.target.value

    const marcaID = marcasList.options[marcasList.selectedIndex].value
    const modeloID = modeloList.options[modeloList.selectedIndex].value
    
    if(imgMoto.classList.contains("active")) {
        let endpoint = endpointMotosValue.replace("{MARCA_ID}", marcaID)
        endpoint = endpoint.replace("{MODELO_ID}", modeloID)
        endpoint = endpoint.replace("{ANO_ID}", anoAtual)

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector(".vehicle_name").innerText = data.Modelo

                document.querySelector(".vehicle_data .reference_month .value").innerText = data.MesReferencia
                document.querySelector(".vehicle_data .fipe_code .value").innerText = data.CodigoFipe
                document.querySelector(".vehicle_data .brand .value").innerText = data.Marca
                document.querySelector(".vehicle_data .year .value").innerText = data.AnoModelo

                document.querySelector(".price").innerText = data.Valor
            })
    }
})

btnBuscar.addEventListener("click", () => {
    modal.classList.remove("hide_modal")
})

btnClose.addEventListener("click", () => {
    modal.classList.add("hide_modal")
})
