// importing styles
import './Success.css';

import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Success = () => {

    const location = useLocation();
    const pokemon = location.state;

    return (
        <div className="successPage">
            <Typography variant='h6'>Your Pokemon is</Typography>
            <br />
            <br />
            <img src={pokemon.image} width="250px"  />
            <Typography variant='h5'>{pokemon.name}</Typography>
        </div>
    );
}

export default Success;