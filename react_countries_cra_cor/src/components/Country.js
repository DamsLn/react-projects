import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = (props) => {

	const [countryData, setCountryData] = useState(null);

	useEffect(() => {
		if (props.name !== '') {
			axios.get('https://restcountries.com/v2/name/'+props.name)
			.then((response) => {
				setCountryData(response.data[0]);
			});
		}
	}, [props.name]);
	  
	let cname = <p>Country name: {props.name}</p>;
	  
	if (countryData) {
		console.log("Country data loaded");
		return (
			<div>
				<div>{cname}</div>
				<p>Top level domain: {countryData.topLevelDomain[0]}</p>
				<p>Capital: {countryData.capital}</p>
				<p>Population: {countryData.population}</p>
				<p>Area: {countryData.area} km²</p>
			</div>
		);
	}
	else {
		console.log("Country data not loaded");
		return (
			<div>
				{cname}
			</div>
		);
	}
}

export default Country;