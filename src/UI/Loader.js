import React from 'react';

export const Loader = (props) => {
 return (
     <div className="d-flex justify-content-center mt-5">
         <div className="spinner-border text-info" role="status">
             <span className="sr-only">Loading...</span>
         </div>
     </div>
 );
};