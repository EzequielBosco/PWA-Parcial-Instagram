const post = {
    username: "Username",
    userImage: "img/perfil.jpg",
    image: "img/post.jpg",
    title: "Nueva publicacion",
    description: "..."
}

function crearCardHTML(post) {
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
                    <p>Descripción: ${post.description}</p>
                </div>           
            </article>`
}

const divContenedor = document.querySelector(".posts")

function cargarPosts(post) {
    divContenedor.innerHTML += crearCardHTML(post)
}

cargarPosts(post)

const btnInicio = document.getElementById('btn-inicio')
btnInicio.addEventListener('click', function(e) {
    e.preventDefault()
    window.location.href = ''
})