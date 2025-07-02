// Variables y constantes
const torneo = "Torneo de Invierno";
let participantes = [];
const maxParticipantes = 5;

function iniciarRegistro() {
  alert("Bienvenido al " + torneo);
  let continuar = confirm("¿Querés registrar participantes?");
  while (continuar && participantes.length < maxParticipantes) {
    const nombre = prompt("Ingrese el nombre del jugador:");
    const categoria = prompt("Ingrese la categoría:");
    const carnet = prompt("Ingrese el número de carnet:");

    if (nombre && categoria && carnet) {
      const jugador = {
        nombre,
        categoria,
        carnet,
      };
      participantes.push(jugador);
      console.log("Jugador registrado:", jugador);
      alert(`Jugador ${nombre} registrado con éxito.`);
    } else {
      alert("Debés completar todos los campos.");
    }

    if (participantes.length < maxParticipantes) {
      continuar = confirm("¿Deseás registrar otro?");
    } else {
      alert("Se alcanzó el máximo de participantes.");
    }
  }

  mostrarResumen();
}

function mostrarResumen() {
  console.log("===== Resumen de Participantes =====");
  for (let i = 0; i < participantes.length; i++) {
    const p = participantes[i];
    console.log(
      `• ${p.nombre} - Categoría ${p.categoria} - Carnet: ${p.carnet}`
    );
  }
  alert("Fin del registro. Consultá la consola para ver el resumen.");
}
