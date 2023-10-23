const API_3 = "https://fakestoreapi.com/products";

async function generarTarjeta(productos) {
    document.querySelector("body").innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${productos.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${productos.name}</h5>
            <p class="card-text">${productos.species}</p>
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

obtenerInfoApi(API_3);


