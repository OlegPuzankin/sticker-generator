import React from 'react';
import {NavLink} from "react-router-dom";
import {FirebaseContext} from "../../firebase";

export const Header = (props) => {

    const {firebase, user} = React.useContext(FirebaseContext);

    return (
        <nav className="navbar navbar-expand bg-light navbar-light justify-content-between align-items-center">
            <div className="navbar-nav">
                <NavLink className="navbar-brand" to={'/'}>Sticker generator</NavLink>
                <ul className="navbar-nav">
                    <li className="nav-item">
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

            <div className='navbar-nav'>
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
    )
};