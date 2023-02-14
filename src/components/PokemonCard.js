// importing styles
import './PokemonCard.css';

import Swal from 'sweetalert2'
import { Chip, Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemonDetails }) => {

    const navigate = useNavigate();

    const randomColor = () => {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
        return color;
    }

    return (
        <div className="pokemonCard">

            <Card className="card" elevation={5} onClick={() => {
                Swal.fire({
                    title: pokemonDetails.name,
                    text: 'Review your pokemon.\n Are you sure? ',
                    icon: 'question',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Confirm',
                    reverseButtons: true,
                    showCancelButton: true,
                    confirmButtonColor: 'green',
                    image: '',
                    cancelButtonColor: 'red',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Confirmed',
                            text: 'Your pokemon has been selected!',
                            confirmButtonText: 'Finish',
                            confirmButtonColor: '#1876d1',
                        }).then(() => {
                            localStorage.setItem("selectedPokemon", JSON.stringify(pokemonDetails));
                            navigate("/success", { state: pokemonDetails });

                        })
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Cancelled',
                            confirmButtonColor: '#1876d1'
                        })
                    }
                })
            }}>
                <CardActionArea>

                    <CardMedia
                        className='thumbnail'
                        component="img"
                        alt="pokemon_thubmnai"
                        height="250"
                        style={{
                            width: "auto",
                            maxHeight: "200px",
                          }}
                          sx={{ display: "flex", marginLeft: "auto", 
                          marginRight: "auto",
                            padding: "10px"}}
                        image={pokemonDetails?.image}
                    >
                    </CardMedia>

                    <CardContent 
                    sx={{borderTop: "1px solid black"}}
                    >
                        <div className='pokemonDetails'>

                            <div className='name'>
                                <Typography variant='h5' >{pokemonDetails?.name}</Typography>
                                <img src={require('./../assets/pokeball.png')} width={40} />
                            </div>
                            <br />

                            <div className='info'>
                                <Typography>Height</Typography>
                                <Typography>{pokemonDetails?.height}</Typography>
                            </div>

                            <div className='info'>
                                <Typography>Weight</Typography>
                                <Typography>{pokemonDetails?.weight}</Typography>
                            </div>
                            <br />

                            <Typography>Types</Typography>

                            <div className='abilities'>
                                {
                                    pokemonDetails.types.map((type, index) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={type}
                                                variant='outlined'
                                                className='chip'
                                                size='small'
                                                style={{ borderColor: 'black' }}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <br />

                            <Typography>Abilities</Typography>

                            <div className='abilities'>
                                {
                                    pokemonDetails.abilities.map((ability, index) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={ability}
                                                variant='filled'
                                                className='chip'
                                                size='small'
                                                style={{ backgroundColor: randomColor(), color: 'white' }}
                                            />
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );

}

export default PokemonCard;