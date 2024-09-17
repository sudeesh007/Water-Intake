import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function attemptLogin() {
        axios.post('https://demo-blog.mashupstack.com/api/login', {
            email: email,
            password: password
        }).then(response => {
            setErrorMessage('')
            var user = {
                email: email,
                token: response.data.token
            }
            dispatch(setUser(user));
            navigate("/home");
        }).catch(error => {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }

    const containerStyle = {
        backgroundImage: `url("https://img.freepik.com/premium-vector/water-tap-background_602006-2715.jpg")`, // Set the background image
        backgroundSize: 'cover', 
        minHeight: '100vh', 
    };

    return (
        <div style={containerStyle}>
            <br></br>
            <br></br>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Login</h1>
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
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
                            <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
