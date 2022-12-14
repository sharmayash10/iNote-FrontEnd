import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Homepage from './Components/Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="container ">
            <Routes>
            <Route exact path="/" element={
                <Homepage />
              }>
              </Route>
              <Route exact path="/home" element={
                <Home />
              }>
              </Route>
              <Route exact path='/about' element={
                <About />
              }>
              </Route>
              <Route exact path="/login" element={
                <Login />
              }>
              </Route>
              <Route exact path="/signup" element={
                <Signup />
              }>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
