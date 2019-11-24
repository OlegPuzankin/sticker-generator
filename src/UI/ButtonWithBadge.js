import React from 'react';

export const ButtonWithBadge = (props) => {
 return (
     <button type="button" className="btn btn-primary">
         Done <span className="badge badge-light">4</span>
     </button>
 );
};