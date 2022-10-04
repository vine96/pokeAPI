const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let countPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'carregando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        countPokemon = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(countPokemon > 1){
        countPokemon -= 1;
        renderPokemon(countPokemon);
    }
});

btnNext.addEventListener('click', () => {
    countPokemon += 1;
    renderPokemon(countPokemon);
});

renderPokemon(countPokemon);