import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/authSlice"; 

function Navbar() {
    const user = useSelector((store) => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            axios.post(
                'https://demo-blog.mashupstack.com/api/logout',
                {},
                {
                    headers: { 'Authorization': "Bearer " + user.token }
                }
            ).then(() => {
                dispatch(removeUser());
                navigate('/login');
            }).catch(error => {
                console.error("Logout failed:", error);
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <div className="navbar-brand"></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav m1-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                        <NavLink to={"/home"} className={'nav-link' + (({ isActive }) => (isActive ? ' active' : ''))} style={{ textDecoration: 'none', color: 'white', marginRight: '200px' }}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/aboutus"} className={'nav-link ' + (({ isActive }) => (isActive ? ' active' : ''))} style={{ textDecoration: 'none', color: 'white', marginRight: '200px' }}>
                            About us
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/add"} className={'nav-link ' + (status => status.isActive ? ' active' : '')}style={{ textDecoration: 'none', color: 'white', marginRight: '200px' }}>
                        
                            ADD/UPDATE WATERINTAKE
                        </NavLink>
                    </li>
                    {}
  
                 {user ?
                        <li className="nav-item">
                            <span className="nav-link logout" onClick={logout} style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>Logout</span>
                        </li> :
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink
                                    to={"/login"}
                                    className={
                                        'nav-link ' +
                                        (({ isActive }) => (isActive ? ' active' : ''))
                                    }
                                    style={{ textDecoration: 'none', color: 'white', marginRight: '50px' }}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
