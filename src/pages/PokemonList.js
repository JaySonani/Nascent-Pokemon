// importing styles
import './PokemonList.css';

// importing components
import PokemonCard from "../components/PokemonCard";

import Loader from '../components/Loader';
import ResultNotFound from '../components/ResultNotFound';
import processPokemonData from '../utils/DataProcessor';
import { fetchPokemonPage, fetchDataForCurrentPokemonPage } from './../utils/Network';

import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PokemonList = () => {

    // pokemonPage: stores current page of pokemon
    const [pokemonPage, setPokemonPage] = useState({})

    // pokemonData: stores data of each pokemon on current page
    const [pokemonData, setPokemonData] = useState([])

    // search box value
    const [searchItem, setSearchItem] = useState("");

    // for pagination
    const [offSet, setOffset] = useState(1);

    // for search filter
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    // for loading animation
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // loading data on page load
        const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";
        loadPokemons(POKEAPI_URL);

        // setting search value from local storage if there is any
        let searchValue = localStorage.getItem("searchItem") ?? "";
        setSearchItem(searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPokemons = async (url) => {

        const [currentPage, offsetValue] = await fetchPokemonPage(url);
        const currentPageData = await fetchDataForCurrentPokemonPage(currentPage);

        Promise.all(currentPageData).then(resultData => {
            setIsLoading(false);
            setPokemonPage(currentPage);

            let processedPokemonData = processPokemonData(resultData);
            setPokemonData(processedPokemonData);
            setFilteredPokemon(processedPokemonData);
        })

        setOffset(offsetValue);
    };

    const changePage = ({ direction }) => {
        setSearchItem("");
        localStorage.setItem("searchItem", "");
        if (direction) {
            loadPokemons(direction);
        }
    }

    const applyFilter = (value) => {
        let temp = pokemonData.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(value.toLocaleLowerCase());
        });
        setFilteredPokemon(temp);
    }

    const captureSearchTerm = (value) => {
        setSearchItem(value);
        localStorage.setItem("searchItem", value);
        applyFilter(value);
    }

    return (
        <div className="pokemonList">

            <div className="pokemonHeader">
                <div>
                    <img src={require('./../assets/pokemon-logo.png')} width={100} alt='pokemon_logo' />
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
                {isLoading ? <Loader /> : filteredPokemon.length !== 0 ?
                    <Grid item container spacing={10} className="grid">
                        {
                            filteredPokemon.filter((pokemon) => {
                                return pokemon.name.toLowerCase().includes(searchItem.toLocaleLowerCase());
                            }).map((pokemon) => {

                                return (
                                    <Grid item>
                                        <PokemonCard pokemonDetails={pokemon} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid> : <ResultNotFound pokemonName={searchItem} />}
            </div>

            <div className="pokemonFooter">
                <Button
                    variant="text"
                    sx={{ color: "#a40001" }}
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
                    sx={{ color: "#a40001" }}
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