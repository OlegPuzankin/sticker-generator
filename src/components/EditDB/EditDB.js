import React from 'react';
import {EditGrapes} from "./EditGrapes";
import {EditGrapesV2} from "./EditGrapesV2";
import {EditCountries} from "./EditCountries";
import {EditRegions} from "./EditRegions";


export const EditDB = (props) => {


        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <EditGrapesV2/>
                    </div>
                    <div className='col'>
                        <EditCountries/>

                    </div>
                    <div className='col'>
                        <EditRegions/>
                    </div>

                </div>
            </div>
        );
    }
;