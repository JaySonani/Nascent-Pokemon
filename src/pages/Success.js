import {useLocation} from 'react-router-dom';


const Success = () => {

    const location = useLocation();
    const pokemon = location.state;


    return(
        <div className="successPage">
            This is success page{pokemon.name}
        </div>
    );

}

export default Success;