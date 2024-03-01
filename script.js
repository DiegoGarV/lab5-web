//Crea el contenedor para todos los textos del chat
const contenedor = document.createElement('div');
contenedor.id = 'contenedor';

//Crea el espacio para el listado de personas en el chat
const listadoPersonas = document.createElement('div');
listadoPersonas.id = 'listado-chats';

// Integrantes en la API
let integrantes = {};
const usuario = "FBI";

//Crea el espacio para agregar cada perfil individual
let contenedorIntegrante;

//Crea el espacio para ver el contenido del chat
const contenidoChat = document.createElement('div');
contenidoChat.id = 'mensajes';

// Crea la barra de búsqueda
const barraBusqueda = document.createElement('input');
barraBusqueda.type = 'text';
barraBusqueda.id = 'barra-busqueda';
barraBusqueda.placeholder = 'Buscar mensaje...';

//Auto scroll para los chats
const contenedorScroll = document.getElementById('mensajes');

//Define los mensajes recibidos
let chat;

//Define los mensajes enviados
let mensajeEnviado;

//Crea el espacio para el nombre y la imagen del perfil
const contenidoPerfil = document.createElement('div');
contenidoPerfil.id = 'contenido-perfil';

//Coloca la foto de perfil
const imagenPerfil = document.createElement('img');
imagenPerfil.width = '65';
imagenPerfil.height = '65';
imagenPerfil.className = 'imagen-perfil';
imagenPerfil.style.borderRadius = '50%';
imagenPerfil.src = 'https://i.kym-cdn.com/photos/images/newsfeed/002/546/909/683.jpg';

//Coloca el nombre del perfil
const namePerfil = document.createElement('h3');
namePerfil.textContent = usuario;

//Crea el botón para cambiar entre modo oscuro y claro
const botonModo = document.createElement('button');
botonModo.textContent = 'Oscuro';

//Crea el espacio para el mensaje que se escribe
const mensaje = document.createElement('div');
mensaje.id = 'contenido-mensaje';

//Área de escritura
const escribirMensaje = document.createElement('textarea');
escribirMensaje.id = 'mensaje-chat';
escribirMensaje.maxLength = 140;

//Botón para enviar
const botonEnviar = document.createElement('button');
botonEnviar.textContent = 'Enviar';

//Estilo del contenedor
contenedor.style.backgroundColor = 'white';
contenedor.style.height = '97vh';
contenedor.style.display = 'grid';
contenedor.style.fontFamily = 'Times New Roman';
contenedor.style.border = '1px solid black';
contenedor.style.gridTemplateColumns = '25% 75%';
contenedor.style.gridTemplateRows = '85% 15%';

//Estilo del listado de personas
listadoPersonas.style.backgroundColor = '#ff9900';
listadoPersonas.style.border = '1px solid black';
listadoPersonas.style.padding = '5px';
listadoPersonas.style.display = 'flex';
listadoPersonas.style.flexDirection = 'column';
listadoPersonas.style.overflowY = 'scroll';
listadoPersonas.style.overflowX = 'hidden';

// Estilo de la barra de busqueda
barraBusqueda.style.width = '60%';
barraBusqueda.style.marginLeft = '35px';
barraBusqueda.style.position = 'fixed';
barraBusqueda.style.top = '10'; 

//Estilo del perfil
contenidoPerfil.style.backgroundColor = '#ff6600';
contenidoChat.style.border = '1px solid black';
contenidoPerfil.style.padding = '5px';
contenidoPerfil.style.display = 'flex';
contenidoPerfil.style.alignItems = 'center';

//Estilo foto de perfil
imagenPerfil.style.marginRight = '8px';

//Estilo del nombre del perfil
namePerfil.style.marginRight = '20px';

//Estilo del boton de cambiar modos entre claro y oscuro
botonModo.style.backgroundColor = '##D5DBDB';

//Estilo del area donde se muestran los chats
contenidoChat.style.backgroundColor = '#ffcc00';
contenidoChat.style.border = '1px solid black';
contenidoChat.style.padding = '8px';
contenidoChat.style.overflowY = 'scroll';
contenidoChat.style.overflowX = 'hidden';

//Estilo de la barra de escritura
mensaje.style.backgroundColor = '#ffcc99';
mensaje.style.border = '1px solid black';
mensaje.style.display = 'flex';
mensaje.style.justifyContent = 'space-evenly';
mensaje.style.padding = '5px';

//Estilo del text area
escribirMensaje.style.width = '93%'
escribirMensaje.style.backgroundColor = 'white';

//Estilo del botón para enviar mensaje
botonEnviar.style.backgroundColor = '#D5DBDB';

//Agrega los textos
document.body.appendChild(contenedor);
contenedor.appendChild(listadoPersonas);
contenedor.appendChild(contenidoChat);
contenedor.appendChild(contenidoPerfil);
contenedor.appendChild(mensaje);
contenidoPerfil.appendChild(imagenPerfil);
contenidoPerfil.appendChild(namePerfil);
contenidoPerfil.appendChild(botonModo);
mensaje.appendChild(escribirMensaje);
mensaje.appendChild(botonEnviar);

// Chats en API
async function obtenerPosts(){
    try {
        const data = await fetch('http://uwu-guate.site:3000/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!data.ok) {
            throw new Error(`HTTP error! status: ${data.status}`);
        }

        const posts = await data.json();
        console.log(posts);

        return posts;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Muestra a todos los integrantes
async function mostrarIntegrantes() {
    try {
        // Obtener los posts de la API
        let misIntegrantes = await obtenerPosts();

        listadoPersonas.innerHTML = ''; 

        // Si es un array, mostrar los integrantes
        if (listadoPersonas != null) {
            // Conjunto para realizar un seguimiento de nombres de usuario únicos
            let nombresUnicos = new Set();

            // Recorre los posts y crea un div para cada integrante
            misIntegrantes.forEach(post => {
                // Verifica si el nombre de usuario ya se agregó
                if (!nombresUnicos.has(post.username)) {
                    contenedorIntegrante = document.createElement('div');
                    contenedorIntegrante.className = 'integrantes';
                    contenedorIntegrante.id = 'integrante';
                    contenedorIntegrante.style.height = '40px';
                    contenedorIntegrante.style.borderBottom = '1px solid black';
                    contenedorIntegrante.style.padding = '8px';
                    contenedorIntegrante.style.display = 'flex';
                    contenedorIntegrante.style.alignItems = 'center';

                    contenedorIntegrante.textContent = post.username;
                    listadoPersonas.appendChild(contenedorIntegrante);
                    nombresUnicos.add(post.username);
                }
            });
        }
    } catch (error) {
        console.error('Error al mostrar los integrantes:', error);
    }
}

function crearChat(id, username, content){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "chat";
    nuevoChat.id = id;
    if(verificarURL(content)){
        nuevoChat.innerHTML = `<strong>${username}</strong>:<br> <img src="${content}" width="200px"/>`;
    } else {
        nuevoChat.innerHTML = `<strong>${username}</strong>:<br> ${content}`;
    }
    return nuevoChat;
}

async function mostrarChats(){
    try {
        // Obtener los posts de la API
        let misPosts = await obtenerPosts();

        // Filtrar los mensajes según la búsqueda
        misPosts = filtrarMensajes(misPosts);
        
        // Limpiar el contenidoChat antes de mostrar los mensajes
        contenidoChat.innerHTML = ''; 
        contenidoChat.appendChild(barraBusqueda);
        
        if(contenidoChat != null){
            misPosts.map(post =>{
                let nuevoChat = crearChat(post.id, post.username, post.content);
                return nuevoChat;
            })
            .forEach(element => {
                //Crea los mensajes dentro del chat
                chat = document.createElement('div')
                chat.className = 'mensaje-chat';
                chat.id = 'chat';
                chat.style.backgroundColor = 'lightblue';
                chat.style.width = '50%';
                chat.style.minHeight = '40px';
                chat.style.borderRadius = '8px';
                chat.style.overflowWrap = 'break-word';
                chat.style.border = '1px solid black';
                chat.style.padding = '8px'
                chat.style.marginBottom = '8px';

                // Mira si el mensaje fue mandado por el usuario de este dispositivo
                if (element.textContent.includes(usuario)) {
                    chat.style.backgroundColor = 'lightgreen';
                    chat.style.marginLeft = '470px';

                } else {
                    chat.style.backgroundColor = 'lightblue';
                }

                chat.appendChild(element);
                contenidoChat.appendChild(chat);
            });
            if (contenidoChat !== null) {
                contenidoChat.scrollTop = contenidoChat.scrollHeight;
            }
        }
    } catch(error) {
        console.error('Error al mostrar los chats:', error);
    }
}

//Función para mandar el mensaje
async function enviarMensaje(){
    try {
        let contenidoMensaje = document.getElementById('mensaje-chat').value;

        let mensajeParaEnviar = {
            "username": usuario,
            "message": contenidoMensaje
        }

        let post = await enviarMensajeApi(mensajeParaEnviar);

        // Crea el mensaje dentro del chat
        mensajeEnviado = document.createElement('div');
        mensajeEnviado.className = 'mensaje-enviado';

        if (!modoClaro) {
            mensajeEnviado.style.backgroundColor = '#1D8348';
        }
        else{
            mensajeEnviado.style.backgroundColor = 'lightgreen';
        }
        mensajeEnviado.style.width = '50%';
        mensajeEnviado.style.minHeight = '40px';
        mensajeEnviado.style.borderRadius = '8px';
        mensajeEnviado.style.border = '1px solid black';
        mensajeEnviado.style.padding = '8px';
        mensajeEnviado.style.marginBottom = '8px';
        mensajeEnviado.style.marginLeft = '470px';

        if(verificarURL(contenidoMensaje)){
            mensajeEnviado.innerHTML = `<strong>${usuario}</strong>:<br> <img src="${contenidoMensaje}" width="200px"/>`;
        } else {
            mensajeEnviado.innerHTML = `<strong>${usuario}</strong>:<br>${contenidoMensaje}`;
        }
        
        if (!modoClaro) {
            mensajeEnviado.classList.add('oscuro');
        }
    
        contenidoChat.appendChild(mensajeEnviado)
    
        animacionEntrada(mensajeEnviado,0);
    
        if (contenidoChat !== null) {
            contenidoChat.scrollTop = contenidoChat.scrollHeight;
        }
        escribirMensaje.value = '';

    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

// Enviar un mensaje a la api
async function enviarMensajeApi(mensaje){
    try{
        let data = await fetch('http://uwu-guate.site:3000/messages',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(mensaje)
        })    
        if(!data.ok){
            throw new Error(`HTTP error! status: ${data.status}`);
        }
        let posts = await data.json();
        console.log(posts);
    
        return posts;
    }catch(error){
        console.error('Error:', error);
    }
    
}

//Función para animar los mensajes enviados
function animacionEntrada(texto,distancia) {
    texto.style.opacity = (distancia / 50);
    texto.style.transform = 'translateX(' + distancia + 'px)';

    if (distancia < 50) {
        requestAnimationFrame(function () {
            animacionEntrada(texto, distancia + 2);
        });
    }
}

//Función para cambiar entre modo claro y oscuro
let modoClaro = true;
function cambiarModo(){
    modoClaro = !modoClaro;
    localStorage.setItem('modoClaro', modoClaro);

    const colores = modoClaro
        ? { contenedor: 'white', texto: 'black', listadoPersonas: '#ff9900', contenidoChat: '#ffcc00', contenidoPerfil: '#ff6600', mensaje:'#ffcc99', botones:'#D5DBDB', enviados: 'lightgreen', recibidos: 'lightblue', leyendaBotonCambio: 'Oscuro'}
        : { contenedor: '#909497', texto: '#F2F3F4', listadoPersonas: '#9C640C', contenidoChat: '#9A7D0A', contenidoPerfil: '#935116', mensaje:'#B9770E', botones:'#797D7F',  enviados: '#1D8348', recibidos: '#1B4F72', leyendaBotonCambio: 'Claro'};

    contenedor.style.backgroundColor = colores.contenedor;
    listadoPersonas.style.backgroundColor = colores.listadoPersonas;
    listadoPersonas.style.color = colores.texto;
    mensaje.style.backgroundColor = colores.mensaje;
    mensaje.style.color = colores.texto;
    contenidoChat.style.backgroundColor = colores.contenidoChat;
    contenidoChat.style.color = colores.texto;
    contenidoPerfil.style.backgroundColor = colores.contenidoPerfil;
    contenidoPerfil.style.color = colores.texto;
    escribirMensaje.style.backgroundColor = colores.contenedor;
    escribirMensaje.style.color = colores.texto;
    botonEnviar.style.backgroundColor = colores.botones;
    botonEnviar.style.color = colores.texto;
    botonModo.style.backgroundColor = colores.botones;
    botonModo.style.color = colores.texto;
    botonModo.textContent = colores.leyendaBotonCambio;
    const mensajesRecibidos = document.getElementsByClassName('mensaje-chat');
    for (let i = 0; i < mensajesRecibidos.length; i++) {
        mensajesRecibidos[i].style.backgroundColor = colores.recibidos;
    }
    const mensajesEnviados = document.getElementsByClassName('mensaje-enviado');
    for (let i = 0; i < mensajesEnviados.length; i++) {
        mensajesEnviados[i].style.backgroundColor = colores.enviados;
    }
}

// Función para verificar que el link es de una imagen
function verificarURL(url) {
    const expresionRegularImagen = /\.(jpg|jpeg|png|gif)$/i;
    return expresionRegularImagen.test(url);
}

// Función para filtrar mensajes según la búsqueda
function filtrarMensajes(posts) {
    const textoBusqueda = barraBusqueda.value.toLowerCase();

    return posts.filter(post => {
        return post.username.toLowerCase().includes(textoBusqueda) ||
               post.content.toLowerCase().includes(textoBusqueda);
    });
}

//Aplica el localstorage al cargar
window.onload = function() {
    let modoGuardado = localStorage.getItem('modoClaro');
    if (modoGuardado !== null) {
        modoClaro = modoGuardado === 'true';
        cambiarModo();
    }
    console.log('Valor almacenado en localStorage:', modoGuardado);
};

// Hace el intervalo para el auto-refresher
const autoRefresher = setInterval(actualizarContenido, 10000);

//Acción del botón para mandar el mensaje
botonEnviar.addEventListener('click', enviarMensaje)

//Acción de enter para mandar el mensaje
escribirMensaje.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        enviarMensaje();
    }
});

//Acción del botón para cambiar modo entre claro y oscuro
botonModo.addEventListener('click', cambiarModo);

// Acción para buscar chats
let timeoutId;
barraBusqueda.addEventListener('input', function () {
    // Agrega un retraso antes de ejecutar la búsqueda para evitar la recarga excesiva
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        mostrarChats();
    }, 3000); // Ajusta el valor del tiempo de espera según sea necesario
});

// Función para mostrar los integrantes y chats
async function actualizarContenido() {
    mostrarIntegrantes();
    mostrarChats();
}

// Evita que el refresher continue si la ventana se cierra
window.addEventListener('beforeunload', () => {
    clearInterval(autoRefresher);
});