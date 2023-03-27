import './App.css';
import Login from './Pages/Login';
import Memories from './Pages/Memories';
import Signup from './Pages/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comments from './Pages/Comments';
import Saved from './Pages/Saved';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
