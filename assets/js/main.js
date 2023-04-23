// JS - FETCH
// const response = 'https://pokeapi.co/api/v2/pokemon/ditto';
// console.log(response);

// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//     .then(respuesta => respuesta.json())
//     .then(datos => console.log(datos))

// agregar <p> al html con el id="pokemnDitto"

// const pokemonList = document.getElementById('pokemonList');
const pokemons = [];
const itemsPerPage = 10;
let currentPage = 1;
// console.log(pokemonDitto);
// fetch

// EMACSCRIPT 6 - ASYNC AWAIT
const getData = async () => {
  try {
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await respuesta.json();
    console.log(data);
    for (let i = 0; i < data.results.length; i++) {
      // imprimePokemon(data.results[i])
      pokemons.push(data.results[i]);
    }
    // console.log(pokemons)
    const pokemon = document.getElementById("pokemon");
    pokemon.removeChild(document.getElementById("cargando"));
    pokemon.innerHTML = `
            <h5>Lista de Pokemones... Selecciona uno</h5>
        `;
    generatePokemonList();
    generatePagination();
  } catch (error) {
    console.log(error);
  }
};

function generatePokemonList() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagePokemons = pokemons.slice(startIndex, endIndex);

  let pokemonListHTML = "";
  for (const pokemon of pagePokemons) {
    pokemonListHTML += `<p>${pokemon.name} - <button onclick="muestraPokemon('${pokemon.url}')">Ver</button></p>`;
  }

  document.getElementById("pokemonList").innerHTML = pokemonListHTML;
}

function generatePagination() {
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  let paginationHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
  }

  document.getElementById("pagination").innerHTML = paginationHTML;
}

function changePage(newPage) {
  currentPage = newPage;
  generatePokemonList();
}

function muestraPokemon(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      pokemon.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <img src="${data.sprites.back_default}" alt="${data.name}">
            <img src="${data.sprites.front_shiny}" alt="${data.name}">
            <img src="${data.sprites.back_shiny}" alt="${data.name}">
        `;
    });
}

function imprimePokemon(pokemon) {
  pokemonList.innerHTML += `
        <li>${pokemon.name} -
        <button onclick="muestraPokemon('${pokemon.url}')">Ver</button>
        </li>    `;
}

getData()

// async function ejemplo(){

// }
