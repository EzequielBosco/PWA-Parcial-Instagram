const post = {
    username: "Username",
    userImage: "img/perfil.jpg",
    image: "img/post.jpg",
    title: "Nueva publicacion",
    description: "...",
    date: new Date()
}

const posts = []

const btnSubir = document.getElementById("btn-subir")
btnSubir.addEventListener('click', function() {
    AgregarPost(post)
})

function AgregarPost(newPost) {
    console.log(posts)
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
                <image class="post-img" src="${post.image}" alt="Imagen de posteo" title="Imagen de posteo"></image>
                <div class="card-footer">
                    <div class="cards-buttons">
                        <button>❤️</button>
                        <button>💬</button>
                    </div>
                    <hr>
                    <h2>${post.title}<h2>
                    <p>Fecha de creación: ${formattedDate}</p>
                    <p>Descripción: ${post.description}</p>
                </div>           
            </article>`
}

function formatFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
    return fecha.toLocaleDateString('es-ES', options)
}

const divContenedor = document.querySelector(".posts")

function cargarPosts(posts) {
    divContenedor.innerHTML = "" 
    posts.forEach(post => {
        divContenedor.innerHTML += crearCardHTML(post)
    })
}

cargarPosts(posts)

const btnInicio = document.getElementById('btn-inicio')
btnInicio.addEventListener('click', function(e) {
    e.preventDefault()
    window.location.href = ''
})