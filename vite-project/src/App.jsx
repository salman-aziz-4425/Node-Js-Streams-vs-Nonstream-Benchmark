import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Video Streaming Example</h1>

                {/* Streaming Video */}
                <div style={{ marginBottom: '20px' }}>
                    <h2>Streaming Video</h2>
                    <video autoPlay controls width="640" height="360">
                        <source src="http://localhost:8000/video" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Non-Streaming Video */}
                {/* <div>
                    <h2>Non-Streaming Video</h2>
                    <video autoPlay controls width="640" height="360">
                        <source src="http://localhost:8000/non-streaming-video" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div> */}
            </header>
        </div>
    );
}

export default App;
