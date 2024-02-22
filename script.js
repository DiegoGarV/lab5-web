//Crea el contenedor para todos los textos del chat
let contenedor = document.createElement('div');
contenedor.id = 'contenedor';

//Crea el espacio para el listado de personas en el chat
let listadoPersonas = document.createElement('div');
listadoPersonas.id = 'listado-chats';
listadoPersonas.textContent = 'listado de integrantes';

//Crea el espacio para agregar cada perfil individual
let contenedorIntegrante = document.createElement("div");

//Agrega la foto de perfil de los integrantes
let imagenPerfilIntegrante = document.createElement('img');

//Agrega el nombre de los integrantes
let namePerfilIntegrante = document.createElement('text');
namePerfilIntegrante.textContent = 'Generico';

//Crea el espacio para ver el contenido del chat
let contenidoChat = document.createElement('div');
contenidoChat.id = 'mensajes';

//Crea el espacio para el nombre y la imagen del perfil
let contenidoPerfil = document.createElement('div');
contenidoPerfil.id = 'contenido-perfil';

//Coloca la foto de perfil
let imagenPerfil = document.createElement('img');
imagenPerfil.width = '65';
imagenPerfil.height = '65';
imagenPerfil.className = 'imagen-perfil';
imagenPerfil.style.borderRadius = '50%';
imagenPerfil.src = 'https://i.kym-cdn.com/photos/images/newsfeed/002/546/909/683.jpg';

//Coloca el nombre del perfil
let namePerfil = document.createElement('h3');
namePerfil.textContent = 'Rafa P';

//Crea el botón para cambiar entre modo oscuro y claro
let botonModo = document.createElement('button');
botonModo.textContent = 'Oscuro';

//Crea el espacio para el mensaje que se escribe
let mensaje = document.createElement('div');
mensaje.id = 'contenido-mensaje';

//Área de escritura
let escribirMensaje = document.createElement('textarea');
escribirMensaje.id = 'mensaje-chat';
escribirMensaje.maxLength = 140;

//Botón para enviar
let botonEnviar = document.createElement('button');
botonEnviar.textContent = 'Enviar';

//Estilo del contenedor
contenedor.style.backgroundColor = 'white';
contenedor.style.height = '100vh';
contenedor.style.display = 'grid';
contenedor.style.fontFamily = 'Times New Roman';
contenedor.style.border = '1px solid black';
contenedor.style.gridTemplateColumns = '20% 80%';
contenedor.style.gridTemplateRows = '85% 15%';

//Estilo del listado de personas
listadoPersonas.style.backgroundColor = '#ff9900';
listadoPersonas.style.border = '1px solid black';
listadoPersonas.style.padding = '5px';
listadoPersonas.style.display = 'flex';
listadoPersonas.style.flexDirection = 'column';
listadoPersonas.style.overflow = 'scroll';

//Estilo del espacio individual del integrante
contenedorIntegrante.style.width = "100%";
contenedorIntegrante.style.minHeight = "60px";
contenedorIntegrante.style.padding = "5px";
contenedorIntegrante.style.display = 'flex';
contenedorIntegrante.style.alignItems = 'center';

//Estilo de la foto de perfil del integrante
imagenPerfilIntegrante.width = '30';
imagenPerfilIntegrante.height = '30';
imagenPerfilIntegrante.style.borderRadius = '50%';
imagenPerfilIntegrante.style.marginRight = '8px';
imagenPerfilIntegrante.src = 'https://i.kym-cdn.com/photos/images/newsfeed/002/546/909/683.jpg';

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
botonModo.style.backgroundColor = '#4e4e4';

//Estilo del area donde se muestran los chats
contenidoChat.style.backgroundColor = '#ffcc00';
contenidoChat.style.border = '1px solid black';
contenidoChat.style.padding = '8px';
contenidoChat.style.overflow = 'scroll';

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
botonEnviar.style.backgroundColor = '#4e4e4';

//Agrega los textos
document.body.appendChild(contenedor);
contenedor.appendChild(listadoPersonas);
contenedor.appendChild(contenidoChat);
contenedor.appendChild(contenidoPerfil);
contenedor.appendChild(mensaje);
listadoPersonas.appendChild(contenedorIntegrante);
contenedorIntegrante.appendChild(imagenPerfilIntegrante);
contenedorIntegrante.appendChild(namePerfilIntegrante);
contenidoPerfil.appendChild(imagenPerfil);
contenidoPerfil.appendChild(namePerfil);
contenidoPerfil.appendChild(botonModo);
mensaje.appendChild(escribirMensaje);
mensaje.appendChild(botonEnviar);

let data = fetch('https://jsonplaceholder.typicode.com/posts',
{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body : JSON.stringify({})
})    
function optenerPost2(){
    let posts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// ASYNC AWAIT - ME PERMITE ESPERAR LA RESPUESTA DE UNA PETICION ASINCRONA
async function optenerPosts(){
    let data = await fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    console.log("await", data);
    let posts = await data.json();
    console.log(posts);

    // console.log("string", JSON.stringify(posts));
    // let new_json = JSON.parse(JSON.stringify(posts));
    // console.log("new_json", new_json);
    return posts;
}

function crearChat(texto, id){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "chat";
    nuevoChat.id = id;
    nuevoChat.innerText = texto;
    return nuevoChat;
}

async function crearMensajes(){
    // mando a traer los post dummys a una api con get
    let misPosts =  await optenerPosts();
    
    // mando a traer el div donde quiero poner los chats
    if(contenidoChat != null){
        // transformamos los dicccionarios a un div de chat
        misPosts.map(post=>{
            let nuevoChat = crearChat(post.title, post.id);
            return nuevoChat;
        })
        // recorremos los nuevos chats y los agremos al div de listados
        .forEach(element => {
            //Crea los mensajes dentro del chat
            let chat = document.createElement('div');
            chat.id = 'chat';
            chat.style.backgroundColor = 'lightblue';
            chat.style.width = '50%';
            chat.style.minHeight = '40px';
            chat.style.borderRadius = '8px';
            chat.style.border = '1px solid black';
            chat.style.padding = '8px'
            chat.style.marginBottom = '8px';

            chat.appendChild(element);
            contenidoChat.appendChild(chat);
        });
    }

}

//Función para mandar el mensaje
function enviarMensaje(){
    let contenidoMensaje = document.getElementById('mensaje-chat').value;

    let mensajeEnviado = document.createElement('div');
    mensajeEnviado.style.backgroundColor = 'lightgreen';
    mensajeEnviado.style.width = '50%';
    mensajeEnviado.style.minHeight = '40px';
    mensajeEnviado.style.borderRadius = '8px';
    mensajeEnviado.style.border = '1px solid black';
    mensajeEnviado.style.padding = '8px';
    mensajeEnviado.style.marginBottom = '8px';

    mensajeEnviado.innerHTML = contenidoMensaje;
    
    contenidoChat.appendChild(mensajeEnviado)

    animacionEntrada(mensajeEnviado,0);

    
    escribirMensaje.value = '';
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

    const colores = modoClaro
        ? { contenedor: 'white', texto: '', listadoPersonas: '#ff9900', contenidoChat: '#ffcc00', contenidoPerfil: '#ff6600', mensaje:'#ffcc99', botones:'#4e4e4', enviados: 'lightgreen', recibidos: 'lightblue', leyendaBotonCambio: 'Oscuro'}
        : { contenedor: '#909497', texto: '', listadoPersonas: '#9C640C', contenidoChat: '#9A7D0A', contenidoPerfil: '#935116', mensaje:'#B9770E', botones:'#626567',  enviados: '#1D8348', recibidos: '#1B4F72', leyendaBotonCambio: 'Claro'};

    aplicarCambio();
    //console.log('Nuevo modo:', modoClaro ? 'Claro' : 'Oscuro');
}

function aplicarCambio(){
    contenedor.style.backgroundColor = colores.contenedor;
    listadoPersonas.style.backgroundColor = colores.listadoPersonas;
    mensaje.style.backgroundColor = colores.mensaje;
    contenidoChat.style.backgroundColor = colores.contenidoChat;
    escribirMensaje.style.backgroundColor = colores.contenedor;
    botonEnviar.style.backgroundColor = colores.botones;
    botonModo.style.backgroundColor = colores.botones;
    botonModo.textContent = colores.leyendaBotonCambio;
    chat.style.backgroundColor = colores.recibidos
    mensajeEnviado.style.backgroundColor = colores.enviados 
}

//Acción del botón para mandar el mensaje
botonEnviar.addEventListener('click', enviarMensaje)

//Acción del botón para cambiar modo entre claro y oscuro
botonModo.addEventListener('click', cambiarModo);

crearMensajes();
