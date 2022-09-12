import './App.css';
import Login from './Pages/Login';
import Memories from './Pages/Memories';
import Signup from './Pages/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/memories" element={<Memories />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
