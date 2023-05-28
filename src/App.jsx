/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { getApiKey } from './utils/getApiKey';
import WeatherCard from './components/WeatherCard';
import Background from './components/Background';
import Loading from './components/Loading';
import SearchCountryForm from './components/searchCountryForm';

function App() {

	const [coords, setCoords] = useState();
	const [weather, setWeather] = useState();
	const [icon, setIcon] = useState();
	const [temp, setTemp] = useState();
	const [search, setSearch] = useState(false);
	const [inputValue, setInputValue] = useState('')
		
	
	useEffect(() => {
		const success = pos => {
			setCoords({
				lat: pos.coords.latitude,
				lon: pos.coords.longitude
			});
		}
		navigator.geolocation.getCurrentPosition(success)
	}, [])

    console.log(search);


	useEffect(() => {
		if (coords) {
			const url = 
						search
							? `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${getApiKey()}`
							: `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${getApiKey()}`;
			axios.get(url)
				.then(res => {
					setWeather(res.data)
					const objTemp = {
						celsius: +((res.data.main.temp) - 273.15).toFixed(1),
						fahrenheit: +(1.8 * (res.data.main.temp - 273) + 32).toFixed(1),

					}
					setTemp(objTemp)
				})
				.catch(err => {
					console.error(err)
					return (
						<div>{inputValue} not valid</div>
					)
				})
		}
	}, [coords, inputValue, search])
	
	
	useEffect(() => {
		if (weather) {
			setIcon(weather.weather[0].icon);					
			const bg_HTML = document.querySelector('.background-img');
			const bg = `/images/${icon}.jpeg`
			bg_HTML.style.backgroundImage = `url(${bg})`;
		}
	}, [weather, icon])
	
	console.log(inputValue);
	console.log(search);

	return (
		<>
			{
				weather 
					? 
					<>
						<Background />
						<SearchCountryForm setInputValue={setInputValue} setSearch={setSearch} search={search} />
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
