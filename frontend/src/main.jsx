import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * This component wraps our app and provides a "Click to Start"
 * screen to solve the browser's audio-blocking policy.
 */
function Main() {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          color: 'white',
          fontFamily: 'sans-serif',
          cursor: 'pointer',
        }}
        onClick={() => setIsStarted(true)}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#999' }}>GEIGER'S GHOST</h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Headphones recommended.
          </p>
          <button
            style={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              color: 'white',
              backgroundColor: '#333',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            CLICK TO START
          </button>
        </div>
      </div>
    );
  }

  // Once started, render the main app
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);