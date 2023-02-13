import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Swal from 'sweetalert2'
import { CardActionArea, Chip, Typography } from '@mui/material';


import './PokemonCard.css';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemonDetails }) => {

    const navigate = useNavigate();

    const randomColor = () => {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);

        return color;
    }

    // const selectPokemon = () => {
    //     console.log(pokemonDetails);

    // }



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
                            navigate("/success",{state: pokemonDetails});

                        })
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Cancelled',
                            confirmButtonColor: '#1876d1'
                            
                        }

                        )
                    }
                })
            }}>
                <CardActionArea>
                    <div>
                        <CardMedia
                            className='thumbnail'
                            component="img"
                            alt="pokemon_thubmnai"
                            height="250"
                            image={pokemonDetails?.image}

                        >
                        </CardMedia>
                    </div>
                    <CardContent>
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
                                    pokemonDetails.types.map((type) => {
                                        return (
                                            <Chip
                                                label={type}
                                                variant='outlined'
                                                className='chip'
                                                size='small'
                                                style={{ borderColor: 'black' }} />
                                        )
                                    })
                                }
                            </div>
                            <br />

                            <Typography>Abilities</Typography>
                            <div className='abilities'>
                                {
                                    pokemonDetails.abilities.map((ability) => {
                                        return (
                                            <Chip
                                                label={ability}
                                                variant='filled'
                                                className='chip'
                                                size='small'
                                                style={{ backgroundColor: randomColor(), color: 'white' }} />
                                        )
                                    })
                                }
                            </div>


                        </div>

                    </CardContent>
                </CardActionArea>
            </Card>

            {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box className='modal'>
                        <Typography variant='h6'>
                            Review your selection
                        </Typography>

                        <Typography variant='h5'>
                            You have selected
                        </Typography>

                        <Typography>
                            {pokemonDetails.name}
                        </Typography>

                    </Box>

                </Fade>
            </Modal> */}
        </div>
    );

}

export default PokemonCard;