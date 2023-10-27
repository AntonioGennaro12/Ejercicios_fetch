const miBody = document.querySelector("body");
const NO_IMAGE = "no_image.jpg";
const APIS = [
              "https://hp-api.onrender.com/api/characters", 
              "https://hp-api.onrender.com/api/character/", // trae por id del personaje
              "https://hp-api.onrender.com/api/characters/house/:house", // no usado:  trae todos los personajes de la casas
      ];

async function muestraChar(info) {
  const myChar = document.querySelector(".my-char-cont");
  let imagen = info.image;
  if (imagen == "") {imagen = NO_IMAGE;}
    myChar.innerHTML = `
      <img src="${imagen}" class="detail-card-img" alt="...">
      <p>Id: ${info.id}</p>
      <h5>${info.name}</h5>
      <p>Nomb. Alt. 1: ${info.alternate_names[0]}</p> 
      <p>Nomb. Alt. 2: ${info.alternate_names[1]}</p> 
      <p>Especie: ${info.species}</p>
      <p>Género: ${info.gender}</p>
      <p>Casa: ${info.house}</p>
      <p>Fecha de Nac. :${info.dateOfBirth}</p>
      <p>Año de Nac. :${info.yearOfBirth}</p>
      <p>Mago/a? :${info.wizard}</p>
      <p>Ascendencia: ${info.ancestry}</p>
      <p>Color de Ojos: ${info.eyeColour}</p>
      <p>Color de Pelo: ${info.hairColour}</p>
      <p>Madera de Varita: ${info.wand.wood}</p>
      <p>Núcleo de Varita: ${info.wand.core}</p>
      <p>Longitud de Varita:${info.wand.length}</p>
      <p>Patrón/a: ${info.patronus}</p>
      <p>Estudiante de Hogwarts: ${info.hogwartsStudent}</p>
      <p>Miembro de Hogwarts: ${info.hogwartsStaff}</p>
      <p>Actor/ Actriz: ${info.actor}</p>
      <p>Actor/ Actriz Alternativo: ${info.alternate_actors}</p>
      <p>Está viva/o: ${info.alive}</p>
    `;
}

async function obtenerAPI (api) {
  const character = await fetch(api);
  const infoc = await character.json();
  //console.table(infoc);
  //console.log(infoc[0].name, infoc[0].gender);
  await muestraChar(infoc[0]);
}

function clickeo (idx) {
//console.log(ids[idx]);
//console.log(APIS[1] + ids[idx]);
obtenerAPI (APIS[1] + ids[idx]);
}

let index = 0; 
let ids = [];

async function generarTarjeta(harryPotter) {
  let imagen = harryPotter.image;
  if (imagen == "") {imagen = NO_IMAGE;}
  const myCardsCont = document.querySelector(".my-cards-cont");
  myCardsCont.innerHTML += `
    <div class="card" style="width:7rem; background-color: lightcyan !important;">
        <img src="${imagen}" class="card-img-top" onclick="clickeo(${index})"; alt="...">
        <div class="card-body">
          <h6 class="card-title">${harryPotter.name}</h6>
        </div>
    </div>
  `;
  ids.push(harryPotter.id);
  index++;
}
async function obtenerInfoApi(api) {
  const resultado = await fetch(api);
  const info = await resultado.json();
  info.forEach(generarTarjeta);
}

function consumirAPIs() {
  miBody.innerHTML = "";
    miBody.innerHTML +=`
        <div class="my-char-cont">
          <h5 class="char-name"> Clickea sobre el personaje para ver todos los datos...</h5>
        </div>
        <div class="my-cards-cont">
        </div>
    `;
    obtenerInfoApi(APIS[0]);
}

consumirAPIs(); 











