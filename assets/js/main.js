// JS - FETCH
// const response = 'https://pokeapi.co/api/v2/pokemon/ditto';
// console.log(response);

// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//     .then(respuesta => respuesta.json())
//     .then(datos => console.log(datos))

// agregar <p> al html con el id="pokemnDitto"
const pokemon = document.getElementById('pokemon');
const pokemonList = document.getElementById('pokemonList');
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
        imprimePokemon(data.results[i])
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