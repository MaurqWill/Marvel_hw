import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList/CharacterList';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import './index.css';

const publicKey = '4d52fb3fa1ef52af3d6b38218aff5477';
const hash = 'a80ea7d0806646c1f3b6bf37422fc6fd';

const App = () => {
  return (
    <div className="app">
      <h1>Marvel Characters</h1>
      <Routes>
        <Route path="/" element={<CharacterList publicKey={publicKey} hash={hash} />} />
        <Route path="/character/:id" element={<CharacterDetails publicKey={publicKey} hash={hash} />} />
      </Routes>
    </div>
  );
};

export default App;
