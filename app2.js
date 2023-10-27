const miBody = document.querySelector("body");
const APIS = [
              "https://hp-api.onrender.com/api/characters",
              "https://hp-api.onrender.com/api/characters/students",
              "https://hp-api.onrender.com/api/characters/staff"   
            ];

async function generarTarjeta(harryPotter) {
   miBody.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${harryPotter.image}" class="card-img-top" alt="NO_IMAGE">
        <div class="card-body">
          <h5 class="card-title">${harryPotter.name}</h5>
          <p class="card-text">Nombre alt: ${harryPotter.alternate_names[1]}</p>
          <p class="card-text">Especie: ${harryPotter.species}</p>
          <p class="card-text">Madera de Varita: ${harryPotter.wand.wood}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  `;
}

async function obtenerInfoApi(api) {
  const resultado = await fetch(api);
  const info = await resultado.json();
  info.forEach(generarTarjeta);
}

let i = 0; 
let j = 0;
function consumirAPIs() {
  function obtenerSiguienteAPI() {
    miBody.innerHTML = "";
    if (i < APIS.length) {
      obtenerInfoApi(APIS[i]);
      i= ++i%APIS.length;
    }
    
    if (j < APIS.length*4) {
      setTimeout(obtenerSiguienteAPI, 10000); 
      j++;
    }
  }

  obtenerSiguienteAPI();
}
consumirAPIs(); 











