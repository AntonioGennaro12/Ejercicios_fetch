const API_1 = "https://pokeapi.co/api/v2/pokemon";

async function generarTarjeta(pokemon) {
    let infoPokemon = await fetch(pokemon.url);
    infoPokemon = await infoPokemon.json();
    infoHabilidad = await fetch(infoPokemon.abilities[0].ability.url);
    infoHabilidad = await infoHabilidad.json();
    document.querySelector("body").innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${infoPokemon.sprites.front_default}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${infoPokemon.name}</h5>
            <p class="card-text">${infoPokemon.abilities[0].ability.name}</p>
            <p class="card-text">${infoHabilidad.effect_entries[0].effect}</p>
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

obtenerInfoApi(API_1);