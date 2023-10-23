const API_4 = "https://randomuser.me/api/?results=5000";

async function generarTarjeta(randomuser) {
    let infoRandomuser = await fetch(randomuser.url);
    infoRandomuser = await infoPokemon.json();
    infoHabilidad = await fetch(infoRandomuser.abilities[0].ability.url);
    infoHabilidad = await infoHabilidad.json();
    document.querySelector("body").innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${randomuser.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${randomuser.name}</h5>
            <p class="card-text">${randomuser.species}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
}

async function obtenerInfoApi(api) {
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.results.forEach(generarTarjeta);
}

obtenerInfoApi(API_4);
