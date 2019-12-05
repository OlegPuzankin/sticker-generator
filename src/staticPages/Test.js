import React from 'react';
import {Export2Doc} from '../exportDoc/exportDoc'

export const Test = () => {


    return (
        <>
            <div id="exportContent">
                <h1>Hello, world!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula bibendum lacinia. Pellentesque placerat
                    interdum nisl non semper. Integer ornare, nunc non varius mattis, nulla neque venenatis nibh, vitae cursus risus
                    quam ut nulla. Aliquam erat volutpat. Aliquam erat volutpat. Etiam eu auctor risus, condimentum sodales nisi.
                    Curabitur aliquam, lorem accumsan aliquam mattis, sem ipsum vulputate quam, at interdum nisl turpis pharetra
                    odio. Vivamus diam eros, mattis eu dui nec, blandit pulvinar felis.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula bibendum lacinia. Pellentesque placerat
                    interdum nisl non semper. Integer ornare, nunc non varius mattis, nulla neque venenatis nibh, vitae cursus risus
                    quam ut nulla. Aliquam erat volutpat. Aliquam erat volutpat. Etiam eu auctor risus, condimentum sodales nisi.
                    Curabitur aliquam, lorem accumsan aliquam mattis, sem ipsum vulputate quam, at interdum nisl turpis pharetra
                    odio. Vivamus diam eros, mattis eu dui nec, blandit pulvinar felis.</p>
            </div>
            <button onClick={()=>Export2Doc('exportContent', 'word-content')}>Export as .doc</button>



        </>

    )


};



