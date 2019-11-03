import React from 'react';
import './App.css';
import Shutter from './Shutter';

function App() {
  return (
      <div className="App">
          <header className="App-header">
            <p>
              Fake App
            </p>
          </header>
              <div>
                  <span>Play the game!</span><br />
                  <p>Try to find two users whose names are isomorphic. <br /><i>You can create new users as well</i></p>
              </div>
              <Shutter />
      </div>
  );
}

export default App;
