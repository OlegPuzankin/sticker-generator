import React from 'react';
import {Link, NavLink, withRouter} from "react-router-dom";
import {FirebaseContext} from "../../firebase";
import '@fortawesome/fontawesome-free/css/all.css'


export const Navbar = (props) => {

    const {firebase, user} = React.useContext(FirebaseContext);

    //const history = useHistory();

    async function handleLogout() {
        debugger
        await firebase.logout();
        debugger
        props.history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to={'/'}>
                <i className="fas fa-wine-glass-alt text-danger"></i>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">

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

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                <Link className="dropdown-item" to={'/edit-countries'}>Edit countries</Link>
                                <Link className="dropdown-item" to={'/edit-regions'}>Edit regions</Link>
                                <Link className="dropdown-item" to={'/edit-appellations'}>Edit appellations</Link>
                                <Link className="dropdown-item" to={'/edit-grapes'}>Edit grapes</Link>
                                <Link className="dropdown-item" to={'/edit-producers'}>Edit producers</Link>

                            </div>
                        </li>

                    </>}


                </ul>
                <span className="navbar-text">
                 {user ? (
                         <>
                             <span className=' text-dark pr-2'>{user.displayName}</span>
                             <span className='divider pr-2'>|</span>
                             <span className='text-dark pr-5 pointer' onClick={handleLogout}>Logout</span>
                         </>
                     )
                     : (<NavLink to="/login" className="nav-link"> Login </NavLink>)
                 }

                </span>
            </div>
        </nav>
    );
};

export default withRouter(Navbar)