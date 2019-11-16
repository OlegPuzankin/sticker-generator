import React from 'react';
import './App.css';

import {Route, Switch} from "react-router-dom";
import {About} from "./staticPages/About";
import {Navbar} from "./components/Navbar";
import {Home} from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <div className="container-fluid pl-0 pr-0 pt-4">
            {/*<Alert alert={{text: 'test alert'}}/>*/}
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/about'} component={About}/>
                <Route path={'/features'} component={About}/>

            </Switch>

        </div>
    </div>
  );
}

export default App;
