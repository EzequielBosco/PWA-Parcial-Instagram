// IMG USER CAMARA
const btnCamara = document.querySelector('#capturar-camara')
const textoDiv = document.querySelector('#texto')

const inputCamera = document.createElement("input")
    inputCamera.type = "file"
    inputCamera.id = "inputCamera"
    inputCamera.accept = "camera"
    inputCamera.capture = "environment-facing"

btnCamara.addEventListener("click", ()=> {
    inputCamera.click()
})

const imagen = document.querySelector("img#imagen-capturada")

inputCamera.addEventListener("change", ()=> {
    if (inputCamera.value !== "") {
        imagen.src = URL.createObjectURL(inputCamera.files[0])
        imagen.style.display = "block"
        textoDiv.style.display = "none"
        btnCamara.style.maxHeight = "100px"
        btnCamara.style.maxWidth = "100px"
    }
})

// IMG POST FILE

const btnPost = document.querySelector("#form-file")
const imagenPost = document.querySelector("img#imagen-post")

btnPost.addEventListener("change", (event) => {
    const inputPost = event.target
    if (inputPost.value !== "") {
        imagenPost.src = URL.createObjectURL(inputPost.files[0])
        imagenPost.style.display = "block"
    }
})

function convertirImagenAbase64() {
    const canvas = document.createElement("canvas")
          canvas.width = imagen.width
          canvas.height = imagen.height
    const ctx = canvas.getContext("2d")
          ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height)
          // document.querySelector("body").appendChild(canvas)
          return canvas.toDataURL("image/jpeg")    
}
