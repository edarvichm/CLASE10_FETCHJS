// JS - FETCH
// const response = 'https://pokeapi.co/api/v2/pokemon/ditto';
// console.log(response);

// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//     .then(respuesta => respuesta.json())
//     .then(datos => console.log(datos))

// agregar <p> al html con el id="pokemnDitto"
const pokemon = document.getElementById('pokemon');
const pokemonList = document.getElementById('pokemonList');
const pokemons = []; 
// console.log(pokemonDitto);
// fetch
function muestraPokemon(url) {
fetch(url)

    .then(response => response.json())
    .then(data => {
        // console.log(data);
        pokemon.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <img src="${data.sprites.back_default}" alt="${data.name}">
            <img src="${data.sprites.front_shiny}" alt="${data.name}">
            <img src="${data.sprites.back_shiny}" alt="${data.name}">
        `;
    })
}

function imprimePokemon(pokemon) {
    
    pokemonList.innerHTML += `
        <li>${pokemon.name} -
        <button onclick="muestraPokemon('${pokemon.url}')">Ver</button>
        </li>    `;
}

// EMACSCRIPT 6 - ASYNC AWAIT
const getData = async () => {
    try {
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const data = await respuesta.json()
    console.log(data)
    for (let i = 0; i < data.results.length; i++) {
        // imprimePokemon(data.results[i])
        pokemons.push(data.results[i]);
    }
    pokemon.removeChild(document.getElementById('cargando'))
    pokemon.innerHTML = `
            <h5>Lista de Pokemones... Selecciona uno</h5>
        `;
    } catch (error) {
        console.log(error)
    }
}

getData()

// async function ejemplo(){

// }


const itemsPerPage = 20;
let currentPage = 1;
let currentSearch = '';

function generatePokemonList(search = '') {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const filteredPokemons = search
        ? pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))
        : pokemons;

    const pagePokemons = filteredPokemons.slice(startIndex, startIndex + itemsPerPage);

    const pokemonHTML = pagePokemons.map(pokemon => `
        <div class="col-md-6">
            <p>${pokemon.name} - <button onclick="muestraPokemon('${pokemon.url}')">Ver</button></p>
        </div>
    `).join('');

    document.getElementById('pokemonList').innerHTML = pokemonHTML;

    generatePagination(filteredPokemons.length);
}

function generatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item${i === currentPage ? ' active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    document.getElementById('pagination').innerHTML = paginationHTML;
}

function changePage(newPage) {
    currentPage = newPage;
    generatePokemonList(currentSearch);
}

document.getElementById('searchInput').addEventListener('input', (event) => {
    currentSearch = event.target.value;
    currentPage = 1;
    generatePokemonList(currentSearch);
});

generatePokemonList();