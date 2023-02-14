const fetchPokemonPage = async (url) => {
    try {
        var requestOptions = {
            method: 'GET',
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        let offset = 1;

        if (url.includes("offset")) {
            offset = (url.split("&")[0].split("=")[1] / 20) + 1;
        } 

        return [data, offset];

    } catch (error) {
        console.log(error);
    }

};

const fetchDataForCurrentPokemonPage = async (pokemonPage) => {
    try {
        var requestOptions = {
            method: 'GET',
        };

        let response = pokemonPage.results.map(async (element) => {
            let eachResponse = await fetch(element.url, requestOptions);
            let data = eachResponse.json();
            return data;
        });

        return response;

    } catch (error) {
        console.log(error);
    }
};

export  {fetchPokemonPage,fetchDataForCurrentPokemonPage};
