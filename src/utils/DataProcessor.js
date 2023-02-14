const processPokemonData = (pokemonData) => {
    var processedPokemonData = [];

    pokemonData.forEach(pokemon => {

        let newPokemon = {};

        newPokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1, pokemon.name.length);
        newPokemon.height = pokemon.height;
        newPokemon.weight = pokemon.weight;
        newPokemon.image = pokemon.sprites.other.dream_world.front_default;

        //abilities
        let temp = [];
        pokemon.abilities.map((item) => {
            return temp.push(item.ability.name);
        });
        newPokemon.abilities = temp;

        //types
        temp = [];
        pokemon.types.map((item) => {
            return temp.push(item.type.name);
        });
        newPokemon.types = temp;

        processedPokemonData.push(newPokemon);

    });

    return processedPokemonData;

}

export default processPokemonData;