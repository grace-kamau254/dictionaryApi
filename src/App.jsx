import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaVolumeUp } from 'react-icons/fa';
import './Index.css';

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const getMeaning = async () => {
    if (!searchWord) {
      setError('Please enter a word to search.');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      setData(response.data[0]);
      setError('');
    } catch (err) {
      setError('Word not found. Please try another word.');
      setData(null);
    }
  };

  const playAudio = (audioUrl) => {
    new Audio(audioUrl).play();
  };

  return (
    <div className="graceContainer">
   <div className="graceContainers">
   <h1>Grace Dictionary App</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Type a word..."
        />
        <button className='btn' onClick={getMeaning}>
          <FaSearch /> Search
        </button>
      </div>

   </div  >
      {error && <p>{error}</p>}
      {data && (
        <div className="result">
          <div className="word">
            {data.word}{' '}
            {data.phonetics[0] && data.phonetics[0].audio && (
              <button onClick={() => playAudio(data.phonetics[0].audio)}>
                <FaVolumeUp />
              </button>
            )}
          </div>
          {data.phonetics[0] && (
            <div className="phonetic">{data.phonetics[0].text}</div>
          )}
          {data.meanings.map((meaning, index) => (
            <div key={index} className="meaning">
              <div className="part-of-speech">{meaning.partOfSpeech}</div>
              {meaning.definitions.map((def, i) => (
                <div key={i} className="definition">
                  {i + 1}. {def.definition}
                  {def.example && <div>e.g., {def.example}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
