const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

//Details
const divDetails = document.querySelector('.pokemon_details');
const pokemon_type = document.querySelector('.pokemon_type');
const pokemon_hp = document.querySelector('.pokemon_hp');
const pokemon_atk = document.querySelector('.pokemon_atk');
const pokemon_def = document.querySelector('.pokemon_def');
const pokemon_speed = document.querySelector('.pokemon_speed');

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

const fetchPokemonTypes = async (type) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
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
        pokemon_type.innerHTML = data.types[0].type.name;
        pokemon_hp.innerHTML = data.stats[0].base_stat;
        pokemon_atk.innerHTML = data.stats[1].base_stat;
        pokemon_def.innerHTML = data.stats[2].base_stat;
        pokemon_speed.innerHTML = data.stats[5].base_stat;
        countPokemon = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

var pokeTypes = [];

var obj = {
    'type': [],
    'qtd': []
};

console.log(obj.typeCount);

const renderType = async (type) => {

    const data = await fetchPokemonTypes(type);

    if (data){
        obj.type.push(data.name);
        obj.qtd.push(data.pokemon.length);
    }
}

var result = Object.entries(obj);
console.log(result[0][1]);

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

pokemonImage.addEventListener('click', () => {
    divDetails.style.display = 'block';
});

divDetails.addEventListener('click', () => {
    divDetails.style.display = 'none';
});

renderPokemon(countPokemon);

$('.pokemon_image').mouseover(function(){
    $('.img_info').css('display', 'block');
});
  
$('.pokemon_image').mouseout(function(){
    $('.img_info').css('display', 'none');
});

for(i=1; i<=20; i++){
    renderType(i);
}


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});