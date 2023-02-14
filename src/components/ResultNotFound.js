// importing styles
import './ResultNotFound.css';

const ResultNotFound = ({pokemonName}) => {
    return(
        <div className="notFound">
            No results found for "{pokemonName}"

        </div>
    );
}

export default ResultNotFound;