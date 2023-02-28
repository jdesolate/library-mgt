import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>React Library Management App</h1>
      <button onClick={() => { navigate('/login'); }}>Login</button>
    </div>
  );
}

export default App;
