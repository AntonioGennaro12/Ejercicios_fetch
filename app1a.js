const miBody = document.querySelector("body");

const API_1 = "https://pokeapi.co/api/v2/pokemon";

async function generarTarjeta(pokemon) {
    let infoPokemon = await fetch(pokemon.url);
    infoPokemon = await infoPokemon.json();
    infoHabilidad = await fetch(infoPokemon.abilities[0].ability.url);
    infoHabilidad = await infoHabilidad.json();
    miBody.innerHTML += `
        <div class="card" style="width: 12rem;">
            <img src="${infoPokemon.sprites.front_default}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${infoPokemon.name}</h5>
            <p class="card-text">Habilidad: ${infoPokemon.abilities[0].ability.name}</p>            
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
    // va debajo de la hability name.. la saco para que no ocupe tanto espacio 
    // <p class="card-text">Efecto: ${infoHabilidad.effect_entries[0].effect}</p>
}
            
async function obtenerInfoApi(api) {
    let cont = 0;
    let nextApi = api;
    while (nextApi) {
        miBody.innerHTML = "";
        const resultado = await fetch(nextApi);
        const info = await resultado.json();
        const results = info.results;
        cont++;
        for (const harryPotter of results) {
            await generarTarjeta(harryPotter);
        }
        // Verifica si hay una página más
        console.log("Bloque: "+cont);
        nextApi = info.next;
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    console.log("Terminé");
}

obtenerInfoApi(API_1);