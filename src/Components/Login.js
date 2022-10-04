import React, {useState, useContext} from 'react'
import { useNavigate  } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const context = useContext(NoteContext);
    const {showAlert} = context;
    let navigate = useNavigate ();
    const handleLogin = async (e) => {
        e.preventDefault();
        const respone = await fetch ("http://localhost:5000/api/auth/login",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const json = await respone.json();
        console.log(json);
        if(json.success){
            setCredentials({email: "", password: ""})
            localStorage.setItem('token', json.authtoken);
            navigate("/")
            showAlert("success", "Logged in successfully");
        }
        else{
            setCredentials({email: "", password: ""})
            showAlert("danger", "Invalid credentials")
        }

    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name= "password" value={credentials.password} onChange={onChange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
