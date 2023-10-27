const miBody = document.querySelector("body");
const API_4 = "https://randomuser.me/api/?results=21";

async function generarTarjeta(randomuser) {
    miBody.innerHTML += `
        <div class="card" style="width: 12rem;">
            <img src="${randomuser.picture.medium}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Nombre: ${randomuser.name.first}</h5>
            <p class="card-text">Ciudad: ${randomuser.location.city}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
}

async function obtenerInfoApi(api) {
    miBody.innerHTML = "";
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.results.forEach(generarTarjeta);
}

setInterval(() => { obtenerInfoApi(API_4);}, 3000);

//obtenerInfoApi(API_4);
