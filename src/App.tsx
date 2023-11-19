import React, { useRef } from 'react';
import './App.css';

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className='App'>
      <input ref={inputRef} />
    </div>
  );
}

export default App;
