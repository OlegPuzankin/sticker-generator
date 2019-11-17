import React from 'react';
import {NavLink} from "react-router-dom";
import {FirebaseContext} from "../firebase";

export const Navbar = (props) => {

    const {firebase, user} = React.useContext(FirebaseContext);


    return (
        <div>
            <nav className="navbar navbar-light bg-light navbar-expand-lg">


                <NavLink className="navbar-brand" to={'/'}>Sticker generator</NavLink>


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink exact className="nav-link" to={'/'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/create'}>Create new sticker</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/about'}>About</NavLink>
                        </li>


                    </ul>
                </div>


                <div className="row">
                    {user ? (
                            <>
                                <div className='text-dark pr-2'>{user.displayName}</div>
                                <div className='divider pr-2'>|</div>
                                <div className='text-dark pr-5 pointer' onClick={() => firebase.logout()}>Logout</div>
                            </>
                        )
                        : (<NavLink to="/login" className="nav-link"> Login </NavLink>)
                    }
                </div>

            </nav>
        </div>
    );
};

