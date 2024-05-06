// IMG USER CAMARA
const btnCamara = document.querySelector('#capturar-camara')
const textoDiv = document.querySelector('#texto')

const inputCamara = document.createElement("input")
    inputCamara.type = "file"
    inputCamara.id = "inputCamara"
    inputCamara.accept = "camera"
    inputCamara.capture = "environment-facing"

btnCamara.addEventListener("click", ()=> {
    inputCamara.click()
})

const imagen = document.querySelector("img#imagen-capturada")

inputCamara.addEventListener("change", ()=> {
    if (inputCamara.value !== "") {
        imagen.src = URL.createObjectURL(inputCamara.files[0])
        imagen.style.display = "block"
        textoDiv.style.display = "none"
        btnCamara.style.maxHeight = "100px"
        btnCamara.style.maxWidth = "100px"
    }
})

// IMG POST FILE

const btnPost = document.querySelector("#form-file")
const imagePost = document.querySelector("img#imagen-post")

btnPost.addEventListener("change", (event) => {
    const inputPost = event.target
    if (inputPost.value !== "") {
        imagePost.src = URL.createObjectURL(inputPost.files[0])
        imagePost.style.display = "block"
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

// Guardar post

const inputNombreUsuario = document.querySelector("input#form-autor")
const inputTitulo = document.querySelector("input#form-title")
const inputDescription = document.querySelector("#form-text")

const btnGuardar = document.querySelector("#btn-subir-post")

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault()
    if (inputNombreUsuario.value.trim() === "" || inputTitulo.value.trim() === "" || imagePost.src === "" || inputDescription.value.trim() === "") {
        ToastIt.now({
            message: "Complete todos los campos",
            style: 'error',
            timer: 3700,
            close: true
        })
        return
    }

    const nuevoPost = {
        username: inputNombreUsuario.value.trim(),
        userImage: imagen.src,
        title: inputTitulo.value.trim(),
        imagePost: imagePost.src,
        description: inputDescription.value.trim(),
        date: new Date()
    }

    console.log(nuevoPost)

    const opciones = {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(nuevoPost)
    }

    fetch(URLposts, opciones)
    .then((response)=> {
        if (response.status === 201) {
            return response.json()
        } else {
            throw new Error("No se puede crear el recurso.")
        }
    })
    .then((data)=> {
        cargarPosts()
        inputCodigo.value = data.id
    })
    .catch(()=> {
        ToastIt.now({
            message: error.message,
            style: 'error',
            timer: 3700,
            close: true
        })
    })

    setTimeout(()=> {
        inputNombreUsuario.value = ""
        inputTitulo.value = ""
        inputDescription.value = ""
        imagen.src = ""
        imagen.style.display = "none"
        imagePost.src = ""
        imagePost.style.display = "none"
        textoDiv.style.display = "block"
        btnCamara.style.maxHeight = "200px"
        btnCamara.style.maxWidth = "200px"
        window.location.href = ''
    }, 3000)
})
