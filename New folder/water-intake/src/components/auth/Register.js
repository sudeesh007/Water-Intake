import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
 

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://demo-blog.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('');
            navigate('login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }

    const containerStyle = {
        backgroundImage: `url("https://cdn4.vectorstock.com/i/1000x1000/05/18/water-wallpaper-one-vector-5920518.jpg")`, // Set the background image
        backgroundSize: 'cover', 
        minHeight: '100vh', 
    };

    return (
        <div style={containerStyle}>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Sign Up</h1>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onInput={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onInput={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onInput={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={passwordConf}
                                onInput={(event) => setPasswordConf(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={registerUser}>Submit</button>
                        </div>
                        <br />
                        Already an User <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
