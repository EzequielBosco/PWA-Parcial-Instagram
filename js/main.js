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

const btnCargar = document.getElementById("btn-cargar")
btnCargar.addEventListener('click', function() {
    cargarPosts()
    ToastIt.now({
        message: "Posts actualizados",
        style: 'success',
        timer: 3000,
    })
})

const btnInicio = document.getElementById('btn-inicio')
btnInicio.addEventListener('click', function(e) {
    e.preventDefault()
    window.location.href = ''
})

// Card -----------------------------------------------------------------------

function crearCardHTML(post) {
    const formattedDate = formatFecha(post.date)
    const postId = `post-${post.id}`

    return  `<article class="card">
                <header>
                    <image src="${post.userImage}" alt="Imagen de usuario" title="Imagen de ${post.username}"></image>
                    <h3>${post.username}</h3>
                </header>
                <image class="post-img" src="${post.imagePost}" alt="Imagen de posteo" title="Imagen de posteo"></image>
                <div class="card-footer">
                    <div class="cards-buttons">
                        <button id="${postId}-heart">❤️</button>
                    </div>
                    <hr>
                    <h2>${post.title}<h2>
                    <p>${formattedDate}</p>
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

        // Ordenamiento por fecha de manera descendente
        posts.sort((a, b) => new Date(b.date) - new Date(a.date))

        if (posts.length > 0) {
            divContenedor.innerHTML = ""
            posts.forEach(post => {
                const cardHTML = crearCardHTML(post)
                divContenedor.innerHTML += cardHTML
            })

            posts.forEach(post => {
                const postId = `#post-${post.id}-heart`;
                const heartButton = document.querySelector(postId)

                if (heartButton) { 
                    heartButton.addEventListener('click', function() {
                        heartButton.classList.toggle('liked')
                    })
                } else {
                    console.error(`No se encontró un botón de corazón con el ID ${postId}`)
                }
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


// Filtro de búsqueda ---------------------------------------------------------

const filtroBusqueda = document.getElementById("search-input")

function filtrarProductos() {
    const valorFiltro = filtroBusqueda.value.toLowerCase()

    const resultado = posts.filter((post) => {
        return post.title.toLowerCase().includes(valorFiltro)
    })

    if (resultado.length > 0) {
        divContenedor.innerHTML = ""
        resultado.forEach(post => {
            divContenedor.innerHTML += crearCardHTML(post)
        })
    } else {
        divContenedor.innerHTML = "<p>No se encontraron resultados</p>"
    }
}

filtroBusqueda.addEventListener("keyup", filtrarProductos)