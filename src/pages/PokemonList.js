import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Button, Grid, TextField, Typography } from "@mui/material";
import './PokemonList.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PokemonList = () => {

    const [pokemonPage, setPokemonPage] = useState({})
    const [pokemonData, setPokemonData] = useState([])

    const [searchItem, setSearchItem] = useState("");
    const [offSet, setOffset] = useState(1);

    useEffect(() => {
        const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";
        fetchData(POKEAPI_URL);
    }, []);

    const fetchData = async (url) => {
        try {
            var requestOptions = {
                method: 'GET',
            };

            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(pokemonPage => {
                    fetchPokemonData(pokemonPage)
                    if (url.includes("offset")) {
                        var page = (url.split("&")[0].split("=")[1] / 20) + 1;
                        setOffset(page);
                    } else {
                        setOffset(1);
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error);
        }
    };

    const fetchPokemonData = async (pokemonPage) => {
        try {
            var requestOptions = {
                method: 'GET',
            };

            let response = pokemonPage.results.map((element) => {
                return fetch(element.url, requestOptions)
                    .then(response => response.json())
                    .then(result => result)
                    .catch(error => console.log('error', error));
            });
            Promise.all(response).then(resultData => {
                setPokemonPage(pokemonPage);
                // console.log(pokemonPage);
                setPokemonData(processPokemonData(resultData));
            })

        } catch (error) {
            console.log(error);
        }
    };

    const processPokemonData = (pokemonData) => {
        var processedPokemonData = [];

        pokemonData.forEach(pokemon => {

            var newPokemon = {};

            newPokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1, pokemon.name.length);
            newPokemon.height = pokemon.height;
            newPokemon.weight = pokemon.weight;
            newPokemon.image = pokemon.sprites.other.dream_world.front_default;

            //abilities
            var temp = [];
            pokemon.abilities.map((item) => {
                temp.push(item.ability.name);
            });
            newPokemon.abilities = temp;

            //types
            temp = [];
            pokemon.types.map((item) => {
                temp.push(item.type.name);
            });
            newPokemon.types = temp;



            processedPokemonData.push(newPokemon);

        });
        // console.log(searchPokemon);
        return processedPokemonData;

    }


    const changePage = ({ direction }) => {
        if (direction) {
            console.log(direction);
            fetchData(direction)
        }
    }

    // console.log("pokemonPage", pokemonPage)
    // console.log("pokemonData", pokemonData)
    return (
        <div className="pokemonList">


            <div className="pokemonHeader">
                <div>
                    <img src={require('./../assets/pokemon-logo.png')} width={100} />
                </div>
                <div>
                    <Typography variant="h6">Choose your pokemon</Typography>
                </div>
                <div className='searchBar'>
                    <TextField
                        variant='outlined'
                        label={'Search Pokemon name'}
                        size="small"
                        value={searchItem}
                        onChange={(event) => setSearchItem(event.target.value)}
                        fullWidth
                    />
                </div>
            </div>


            <div className="pokemonGrid">
                <Grid item container spacing={10} className="grid">
                    {
                        pokemonData.filter((pokemon) => {
                            return pokemon.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
                        }).map((pokemon, index) => {
                            if (pokemon == null) {
                                console.log("No results found");
                            }
                            return (
                                <Grid item
                                //  xs={12} sm={6}
                                //     md={3} 
                                >
                                    <PokemonCard pokemonDetails={pokemon} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>


            <div className="pokemonFooter">
                <Button
                    variant="text"
                    onClick={() => changePage({ direction: pokemonPage.previous })}
                    startIcon={<ArrowBackIcon />}
                >
                    Previous
                </Button>

                <Typography>
                    Page {offSet} out of {Math.ceil(pokemonPage.count / 20)}
                </Typography>

                <Button
                    variant="text"
                    onClick={() => changePage({ direction: pokemonPage.next })}
                    endIcon={<ArrowForwardIcon />}
                >
                    Next
                </Button>
            </div>
        </div>
    );

}

export default PokemonList;