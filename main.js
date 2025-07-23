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

function eliminarJugador(index) {
  if (confirm("¿Estás seguro de eliminar este jugador?")) {
    participantes.splice(index, 1);
    guardarEnLocalStorage();
    mostrarResumen();
  }
}

function mostrarResumen() {
  listaParticipantes.innerHTML = "";

  if (participantes.length === 0) {
    listaParticipantes.innerHTML = "<p>No hay participantes registrados.</p>";
    return;
  }

  participantes.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "jugador";
    div.innerHTML = `
      ${index + 1}. ${p.nombre} - Categoría ${p.categoria} - Carnet: ${p.carnet}
      <button class="eliminar-btn" data-index="${index}">Eliminar</button>
    `;
    listaParticipantes.appendChild(div);
  });

  document.querySelectorAll(".eliminar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      eliminarJugador(index);
    });
  });
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
