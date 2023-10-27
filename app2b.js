const API_2B = "https://hp-api.onrender.com/api/spells";

async function generarTarjeta(spells) {    // muestra los hechizos
    document.querySelector("body").innerHTML += `
        <div class="card" style="width: 8rem;">
            <div class="card-body">
            <h5 class="card-title">Nombre: ${spells.name}</h5>
            <p class="card-text">Hechizo: ${spells.description}</p>
            <a href="#" class="btn btn-primary">Aplicar</a>
            </div>
        </div>
    `;
}

async function obtenerInfoApi(api) {
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.forEach(generarTarjeta); 
}

obtenerInfoApi(API_2B);
