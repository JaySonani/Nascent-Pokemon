
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './pages/Form';
import PokemonList from './pages/PokemonList';
import Success from './pages/Success';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Form />} /> */}
        <Route path="/" element={<Form />} />
        <Route path="/pokemon_list" element={<PokemonList/>} />
        <Route path="/success" element={<Success/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;


//TODO: First name par autofocus aapi de on page load