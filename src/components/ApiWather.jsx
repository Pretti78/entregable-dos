import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ApiWather = () => {
	const [api, setApi] = useState({});

	useEffect(() => {
		function success(pos) {
			var crd = pos.coords;
			console.log('Latitude : ' + crd.latitude);
			console.log('Longitude: ' + crd.longitude);
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a3321ff25b5c1603fe76384a4aa0a377
      `
				)
				.then((res) => setApi(res.data));
		}

		navigator.geolocation.getCurrentPosition(success);
	}, []);

	console.log(api);

	const [isCelcius, setIsCelcius] = useState(true);

	const celcius = Math.floor(api.main?.feels_like - 273);
	const fahrenheit = Math.floor(celcius * 1.8 + 32);
	const celciusMin = Math.floor(api.main?.temp_min - 273);
	const fahrenheit1 = Math.floor(celciusMin * 1.8 + 32);
	const celciusMax = Math.floor(api.main?.temp_max - 273);
	const fahrenheit2 = Math.floor(celciusMax * 1.8 + 32);

	return (
		<div className="main-time">
			<h1 className="tittle">THE TIME NOW</h1>
			<div className="card-main">
				<div className="country">
					<h2>
						{api.sys?.country} - {api.name}
					</h2>
				</div>
				<div className="content-main">
					<div className="temp">
						<img
							src={`http://openweathermap.org/img/wn/${api.weather?.[0].icon}@2x.png`}
						/>
						<h3>{isCelcius ? `${celcius}°c` : `${fahrenheit}°f`}</h3>
					</div>
					<div className="info">
						<div className="temp-info">
							<h3>
								<i className="fa-solid fa-temperature-arrow-down"></i>
								Min: {isCelcius ? `${celciusMin}°c` : `${fahrenheit1}°f`}
							</h3>
							<h3>
								<i className="fa-solid fa-temperature-arrow-up"></i>
								Max: {isCelcius ? `${celciusMax}°c` : `${fahrenheit2}°f`}
							</h3>
						</div>
						<div className="temp-info">
							<h3>
								<i class="fa-solid fa-wind"></i>: {api.wind?.speed}Km/h
							</h3>
							<h3>humidity: {api.main?.humidity}%</h3>
						</div>
					</div>
				</div>
				<div className="temp-info">
					<h3>Darling: {api.weather?.[0].description}</h3>
				</div>
				<button className="button" onClick={() => setIsCelcius(!isCelcius)}>
					<b>Change °C/°F</b>
				</button>
			</div>
		</div>
	);
};

export default ApiWather;
