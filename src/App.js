// importing pages
import Form from './pages/Form';
import Success from './pages/Success';
import PokemonList from './pages/PokemonList';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/pokemon_list" element={<PokemonList />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;