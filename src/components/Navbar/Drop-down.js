import React from 'react';
import {Link, NavLink} from "react-router-dom";

export const Dropdown = (props) => {
 return (
     <div className="dropdown">
         <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Edit database
         </a>

         <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <Link className="dropdown-item" to={'/edit-countries'}>Edit countries</Link>
             <Link className="dropdown-item" to={'/edit-regions'}>Edit regions</Link>
             <Link className="dropdown-item" to={'/edit-appellations'}>Edit appellations</Link>
             <Link className="dropdown-item" to={'/edit-grapes'}>Edit grapes</Link>
             <Link className="dropdown-item" to={'/edit-producers'}>Edit producers</Link>

         </div>
     </div>
 );
};