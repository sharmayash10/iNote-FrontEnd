import React, {useContext} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';
const Navbar = () => {
    let location = useLocation();
    const context = useContext(NoteContext)
    const {showAlert} = context
    let navigate = useNavigate();
    const handleLogout =() =>{
        localStorage.removeItem('token');
        navigate("/");
        showAlert("success", "Logged out successfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNote</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-aut o mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""} `} aria-current="page" to="/home">Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about"> About</Link>
                            </li>
                        </ul>
                    </div>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
                    </form>: <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}

                </div>
            </nav>
        </>
    );
}

export default Navbar;
