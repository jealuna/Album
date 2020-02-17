import React from 'react';
import { Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Album from './components/Albumes';
import Foto from './components/Fotos';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Switch>
            <Route  exact path="/" component={Album} />
            <Route path="/fotos/" component={Foto} />
          </Switch >
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
