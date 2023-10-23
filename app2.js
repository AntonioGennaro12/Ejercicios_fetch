const miBody = document.querySelector("body");
const APIS = [
              "https://hp-api.onrender.com/api/characters",
              "https://hp-api.onrender.com/api/characters/students",
              "https://hp-api.onrender.com/api/characters/staff",
              "https://fakestoreapi.com/products",
              "https://hp-api.onrender.com/api/character/:id",  //NO
              "https://hp-api.onrender.com/api/characters/house/:house", // NO
              "https://hp-api.onrender.com/api/spells" // NO
      ];

async function generarTarjeta(harryPotter) {
   miBody.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${harryPotter.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${harryPotter.name}</h5>
        <p class="card-text">${harryPotter.species}</p>
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
      console.log("paso 1: "+i);
      obtenerInfoApi(APIS[i]);
      i= ++i%4;
      console.log("paso 2: "+i);
    }
    
    if (j < APIS.length*4) {
      setTimeout(obtenerSiguienteAPI, 10000); 
      console.log("paso 3-j: "+j);
      j++;
    }
  }

  obtenerSiguienteAPI();
}
consumirAPIs(); // Comienza el proceso de consumo de APIs











