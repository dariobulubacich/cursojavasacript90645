const torneo = "Torneo de Invierno";
const maxParticipantes = 5;
let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

const form = document.getElementById("registroForm");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria");
const carnetInput = document.getElementById("carnet");
const listaParticipantes = document.getElementById("listaParticipantes");
const reiniciarBtn = document.getElementById("reiniciarBtn");

function guardarEnLocalStorage() {
  localStorage.setItem("participantes", JSON.stringify(participantes));
}

function iniciarRegistro() {
  alert("Bienvenido al " + torneo);
  let continuar = confirm("¿Querés registrar participantes?");

  while (continuar && participantes.length < maxParticipantes) {
    const nombre = prompt("Ingrese el nombre del jugador:")?.trim();
    const categoria = prompt("Ingrese la categoría:")?.trim();
    const carnet = prompt("Ingrese el número de carnet:")?.trim();

    if (!nombre || !categoria || !carnet) {
      alert("Debés completar todos los campos.");
    } else if (participantes.some((p) => p.carnet === carnet)) {
      alert("Este número de carnet ya fue ingresado.");
    } else {
      const jugador = { nombre, categoria, carnet };
      participantes.push(jugador);
      console.log("Jugador registrado:", jugador);
      alert(`Jugador ${nombre} registrado con éxito.`);
    }

    if (participantes.length < maxParticipantes) {
      continuar = confirm("¿Deseás registrar otro?");
    } else {
      alert("Se alcanzó el máximo de participantes.");
    }
  }

  guardarEnLocalStorage();
  mostrarResumen();
}

function eliminarJugador(index) {
  if (confirm("¿Estás seguro de eliminar este jugador?")) {
    participantes.splice(index, 1);
    guardarEnLocalStorage();
    mostrarResumen();
  }
}

function mostrarResumen() {
  if (participantes.length === 0) {
    console.log("No hay participantes registrados.");
    return;
  }

  console.log("===== Resumen de Participantes =====");
  participantes.forEach((p) => {
    console.log(
      `• ${p.nombre} - Categoría ${p.categoria} - Carnet: ${p.carnet}`
    );
  });

  alert("Fin del registro. Consultá la consola para ver el resumen.");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (participantes.length >= maxParticipantes) {
    alert("Se alcanzó el máximo de participantes.");
    return;
  }

  const nombre = nombreInput.value.trim();
  const categoria = categoriaInput.value.trim();
  const carnet = carnetInput.value.trim();

  if (nombre && categoria && carnet) {
    const jugador = { nombre, categoria, carnet };
    participantes.push(jugador);
    guardarEnLocalStorage();
    mostrarResumen();
    form.reset();
    alert(`Jugador ${nombre} registrado con éxito.`);
  } else {
    alert("Debés completar todos los campos.");
  }
});

reiniciarBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que querés reiniciar todo el registro?")) {
    participantes = [];
    guardarEnLocalStorage();
    mostrarResumen();
  }
});

window.addEventListener("DOMContentLoaded", mostrarResumen);
