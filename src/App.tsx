import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
