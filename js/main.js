const defaultPost = {
    id: 1,
    username: "Username",
    userImage: "img/perfil.jpg",
    image: "img/post.jpg",
    title: "Nueva publicacion",
    description: "...",
    date: new Date()
}

const posts = []
const URLposts = "https://66388ba94253a866a24e2e86.mockapi.io/api/parcial/posts"

const btnSubir = document.getElementById("btn-subir")
btnSubir.addEventListener('click', function() {
    AgregarPost(defaultPost)
})

function AgregarPost(newPost) {
    posts.push(newPost)
    cargarPosts(posts)
}

// Card -----------------------------------------------------------------------

function crearCardHTML(post) {
    const formattedDate = formatFecha(post.date)

    return  `<article class="card">
                <header>
                    <image src="${post.userImage}" alt="Imagen de usuario" title="Imagen de ${post.username}"></image>
                    <h3>${post.username}</h3>
                </header>
                <image class="post-img" src="${post.imagePost}" alt="Imagen de posteo" title="Imagen de posteo"></image>
                <div class="card-footer">
                    <div class="cards-buttons">
                        <button>❤️</button>
                    </div>
                    <hr>
                    <h2>${post.title}<h2>
                    <p>Fecha de creación: ${formattedDate}</p>
                    <p>Descripción: ${post.description}</p>
                </div>           
            </article>`
}

function formatFecha(fecha) {
    if (!(fecha instanceof Date)) {
        fecha = new Date(fecha)
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
    return fecha.toLocaleDateString('es-ES', options)
}

function retornarCardError() {
    return `                
        <p>Intenta nuevamente en unos segundos...</p>
        <h3>Los posteos deberían verse así ⬇</h3>
        <div>
            <article class="card">
                <header>
                    <image src="${defaultPost.userImage}" alt="Imagen de usuario" title="Imagen de ${defaultPost.username}"></image>
                    <h3>Username</h3>
                </header>
                <image class="post-img" src="${defaultPost.image}" alt="Imagen de posteo" title="Imagen de posteo"></image>
            </article>
        </div>`
}

// Cargar posts ----------------------------------------------------------------

const divContenedor = document.querySelector(".posts")

async function cargarPosts() {
    try {
        const response = await fetch(URLposts)
        if (!response.ok) {
            throw new Error("No se pueden obtener los posts del servidor.")
        }

        const data = await response.json()
        posts.length = 0
        posts.push(...data)
        if (posts.length > 0) {
            divContenedor.innerHTML = ""
            posts.forEach(post => {
                divContenedor.innerHTML += crearCardHTML(post)
            })
        } else {
            divContenedor.innerHTML = retornarCardError()
        }
    } catch (error) {
        ToastIt.now({
            message: "Error al obtener los posts",
            style: 'error',
            timer: 3700,
            close: true
        })
        divContenedor.innerHTML = retornarCardError()
    }
}

cargarPosts(posts)

const btnInicio = document.getElementById('btn-inicio')
btnInicio.addEventListener('click', function(e) {
    e.preventDefault()
    window.location.href = ''
})