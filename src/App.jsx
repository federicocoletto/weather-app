/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { getApiKey } from './utils/getApiKey';
import WeatherCard from './components/WeatherCard';
import Background from './components/Background';

function App() {

	const [coords, setCoords] = useState();
	const [weather, setWeather] = useState();
	const [icon, setIcon] = useState();
	
	
	useEffect(() => {
		const success = pos => {
			setCoords({
				lat: pos.coords.latitude,
				lon: pos.coords.longitude
			});
		}
		navigator.geolocation.getCurrentPosition(success)
	}, [])

	useEffect(() => {
		if (coords) {
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${getApiKey()}&units=metric`
			axios.get(url)
				.then(res => setWeather(res.data))
				.catch(err => console.error(err))
		}
	}, [coords])
	
	
	useEffect(() => {
		if (weather) {
			setIcon(weather.weather[0].icon);					
			const bg_HTML = document.querySelector('.background-img');
			const bg = `/images/${icon}.jpeg`
			bg_HTML.style.backgroundImage = `url(${bg})`;
		}
	}, [weather, icon])
			
	
	
	
	return (
		<>
			<Background />
			<WeatherCard weather={weather}/>
		</>
	)
}
	
export default App
