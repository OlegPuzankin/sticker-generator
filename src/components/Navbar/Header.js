import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {FirebaseContext} from "../../firebase";
import {Dropdown} from "./Drop-down";

const Header = (props) => {

    const {firebase, user} = React.useContext(FirebaseContext);
    //const history = useHistory();

    async function handleLogout (){
        debugger
        await firebase.logout();
        debugger
        props.history.push('/')
    }

    return (
        <nav className="navbar navbar-expand bg-light navbar-light justify-content-between align-items-center">
            <div className="navbar-nav">
                <NavLink className="navbar-brand" to={'/'}>Sticker generator</NavLink>


                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to={'/'}>Home</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/about'}>About</NavLink>
                    </li>


                    {user &&
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/create'}>Create new sticker</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/editDB'}>Edit database</NavLink>
                        </li>
                        <Dropdown/>
                    </>}


                </ul>

            </div>

            <div className='navbar-nav'>
                {user ? (
                        <>
                            <div className='text-dark pr-2'>{user.displayName}</div>
                            <div className='divider pr-2'>|</div>
                            <div className='text-dark pr-5 pointer' onClick={handleLogout}>Logout</div>
                        </>
                    )
                    : (<NavLink to="/login" className="nav-link"> Login </NavLink>)
                }
            </div>
        </nav>
    )
};

export default withRouter(Header)