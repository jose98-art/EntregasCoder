const socketClient = io();

//Elementos
const nombreUser = document.getElementById("nombreUsuario");
const formulario = document.getElementById("formulario");
const inputMensaje = document.getElementById("mensaje");
const inputChat = document.getElementById("chat");

let user = null;

if (!user) {
  Swal.fire({
    title: "Bienvenido",
    text: "Ingresa tu usuario",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas ingresar un usuario";
      }
    },
  }).then((username) => {
    user = username.value;
    nombreUser.innerText = user;
    socketClient.emit("newUser", user);
  });
}

formulario.onsubmit = (e) => {
  e.preventDefault();

  const info = {
    nombre: user,
    mensaje: inputMensaje.value,
  };

  socketClient.emit("mensaje", info);
  inputMensaje.value = '';

  const option = {
    method: 'POST',
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(info)
  }

  fetch("/api/mensaje", option)
  .then(response => {
    if (response.ok)
        console.log(response)
    else
        throw new Error(response.status);
})
    .catch(err =>{
      console.log('Error: ', err.message)
    })




};

socketClient.on("chat", (mensaje) => {
  console.log(mensaje);
  const chatRender = mensaje.map(elem => {
    return `<div class='mensajeRender'>
              <p>
                <strong>${elem.nombre}:</strong> 
                  <br>${elem.mensaje}
              </p>
            </div>
             `
  }).join(' ')
  inputChat.innerHTML = chatRender
});

socketClient.on('broadcast', user=>{
  console.log(`Usuario conectado: ${user}`)
  Toastify({
    text: `Ingreso ${user} al chat`,
    duration: 5000,
    position: 'rigth',
    style:{
      backgrount: 'linear-gradient(to right, #00b09b, #96c93d) '
    }
  }).showToast()
})