/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const WeatherCard = ({weather, temp}) => {

    const [tempUnits, setTempUnits] = useState(true);
    const [country, setCountry] = useState(weather.name)

    const handleTemp = () => {
        setTempUnits(!tempUnits)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(country);
    }
    
    const handleChange = (e) => {
        setCountry(e.target.inputCountry.value)
    }

    return (
        weather 
        ? 
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <input id='inputCountry' type="text" placeholder='Search country' value={country} onChange={handleChange}/>
                <button>Search</button>
            </form>
            <header>
                <h1>{weather.name}, {weather.sys.country}</h1>
                <h2>{weather.weather[0].main}</h2>
            </header>
            <div className="weather-img">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <h2 className="actual">{tempUnits ? temp.celsius + ' °C': temp.fahrenheit + ' °F'} </h2>
                <button className='units-btn' onClick={handleTemp}>Change to {tempUnits ? '°F' : '°C'}</button>
            </div>
            <section className="temp">
                <aside className='sunrise'>
                    <h4>SUNRISE</h4>
                    <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5)}</p>
                </aside>
                <aside className='sunset'>
                    <h4>SUNSET</h4>
                    <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString().slice(0, 5)}</p>

                </aside>
            </section>
            <footer>
                <ul>
                    <li>
                        <h5>PRESS</h5>
                        <p>{weather.main.pressure}hPa</p>
                    </li>
                    <li className='wind'>
                        <h5>WIND</h5>
                        <p>{weather.wind.speed}m/s</p>
                    </li>
                    <li>
                        <h5>HUM</h5>
                        <p>{weather.main.humidity}%</p>
                    </li>
                </ul>
            </footer>
        </div>
        : <></>
    )
}

export default WeatherCard