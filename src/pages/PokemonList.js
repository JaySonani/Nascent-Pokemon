// importing styles
import './PokemonList.css';

// importing components
import PokemonCard from "../components/PokemonCard";

import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResultNotFound from '../components/ResultNotFound';

const PokemonList = () => {

    // pokemonPage: stores current page of pokemon
    const [pokemonPage, setPokemonPage] = useState({})

    // pokemonData: stores data of each pokemon on current page
    const [pokemonData, setPokemonData] = useState([])

    // search box value
    const [searchItem, setSearchItem] = useState("");

    // for pagination
    const [offSet, setOffset] = useState(1);

    useEffect(() => {
        // loading data on page load
        const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";
        fetchData(POKEAPI_URL);

        // setting search value from local storage if there is any
        let searchValue = localStorage.getItem("searchItem") ?? "";
        setSearchItem(searchValue);
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
                setPokemonData(processPokemonData(resultData));
            })

        } catch (error) {
            console.log(error);
        }
    };

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

        return processedPokemonData;

    }


    const changePage = ({ direction }) => {
        setSearchItem("");
        if (direction) {
            console.log(direction);
            fetchData(direction);
        }
    }

    const captureSearchTerm = (value) => {
        setSearchItem(value);
        localStorage.setItem("searchItem", value);
    }

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
                        onChange={(event) => captureSearchTerm(event.target.value)}
                        fullWidth />
                </div>
            </div>

            <div className="pokemonGrid">
                <Grid item container spacing={10} className="grid">
                    {
                        pokemonData.filter((pokemon) => {
                            return pokemon.name.toLowerCase().includes(searchItem.toLocaleLowerCase());
                        }).map((pokemon) => {

                            return (
                                <Grid item>
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