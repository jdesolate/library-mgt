import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components';
import BookPage from './pages/BookPage';
import ErrorPage from './pages/Error';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route
          element={(
            <ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
          )}
          path="/books"
        />
        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
