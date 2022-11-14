import './App.css';
import Login from "./components/Login"
import Home from "./components/Home"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<><Header/><Home/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
