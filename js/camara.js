const URLposts = "https://66388ba94253a866a24e2e86.mockapi.io/api/parcial/posts"

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

function convertirImagenAbase64(img) {
    if (img == null) {
        ToastIt.now({
            message: "No hay imagen",
            style: 'error',
            timer: 3500,
            close: true
        })
        throw new Error("No hay imagen para convertir")
    }
    const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
    const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, img.width, img.height)
          return canvas.toDataURL("image/jpeg")    
}

// Guardar post

const inputNombreUsuario = document.querySelector("input#form-autor")
const inputTitulo = document.querySelector("input#form-title")
const inputDescription = document.querySelector("#form-text")

const btnGuardar = document.querySelector("#btn-subir-post")

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault()

    const img = document.querySelector("img#imagen-capturada")
    const imgPost = document.querySelector("img#imagen-post")

    if (inputNombreUsuario.value.trim() === "" || inputTitulo.value.trim() === "" || imgPost.src === "http://127.0.0.1:5500/camara.html" || inputDescription.value.trim() === "" || img.src === "http://127.0.0.1:5500/camara.html") {
        ToastIt.now({
            message: "Complete todos los campos",
            style: 'error',
            timer: 3500,
            close: true
        })
        return
    }

    const nuevoPost = {
        username: inputNombreUsuario.value.trim(),
        userImage: convertirImagenAbase64(img),
        title: inputTitulo.value.trim(),
        imagePost: convertirImagenAbase64(imgPost),
        description: inputDescription.value.trim(),
        date: new Date()
    }

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
            throw new Error("No se puede crear el post.")
        }
    })
    .then(()=> {
        ToastIt.now({
            message: 'Post creado correctamente!',
            style: 'success',
            timer: 2500,
        })
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 2500)
    })
    .catch((error)=> {
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
        textoDiv.style.display = "block"
        btnCamara.style.maxHeight = "200px"
        btnCamara.style.maxWidth = "200px"
    }, 3000)
})
