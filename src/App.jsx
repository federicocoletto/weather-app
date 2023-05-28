/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { getApiKey } from './utils/getApiKey';
import WeatherCard from './components/WeatherCard';
import Background from './components/Background';
import Loading from './components/Loading';

function App() {

	const [coords, setCoords] = useState();
	const [weather, setWeather] = useState();
	const [icon, setIcon] = useState();
	const [temp, setTemp] = useState();
	
	
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
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${getApiKey()}`
			axios.get(url)
				.then(res => {
					setWeather(res.data)
					const objTemp = {
						celsius: +((res.data.main.temp) - 273.15).toFixed(1),
						fahrenheit: +(1.8 * (res.data.main.temp - 273) + 32).toFixed(1),

					}
					setTemp(objTemp)
				})
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
			{
				weather 
					? 
					<>
						<Background />
						<WeatherCard 
							weather={weather}
							temp={temp}
						/>
					</>
					: <Loading />					
			}
		</>
	)
}
	
export default App
