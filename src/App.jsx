import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Weather from './components/Weather';

function App() {
  const [searches, setSearches] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const API_KEY = "93681442608099e36c3facc8c61fb383";

  const searchLocation = (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios.get(url)
      .then((response) => {
        setSearches((prevSearches) => [...prevSearches, response.data]);
      })
      .catch((error) => {
        console.error("Error al obtener datos del clima:", error);
      });

    setInputValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchLocation(inputValue);
    }
  };

  const handleDelete = (id) => {
    setSearches((prevSearches) => prevSearches.filter(weatherData => weatherData.id !== id));
  };

  return (
    <div className='w-full h-full relative p-4'>
      <div className='text-center mb-4'>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='py-3 px-6 w-full max-w-[700px] text-lg rounded-3xl border 
          border-gray-200 text-gray-600 placeholder:text-gray-400 
          focus:outline-none bg-white-600/100 shadow-md mx-auto'
          placeholder='Ingresa la ubicación'
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-col items-center">
        {searches.map((weatherData, index) => (
          <div key={index} className="mb-8 w-full max-w-[700px]">
            <Weather weatherData={weatherData} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;