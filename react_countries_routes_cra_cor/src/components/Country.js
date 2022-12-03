import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Country = (props) => {

	const [countryData, setCountryData] = useState(null);

	useEffect(() => {
		if (props.match.params.name !== '') {
			axios.get('https://restcountries.com/v2/name/'+props.match.params.name)
			.then((response) => {
				setCountryData(response.data[0]);
			}
			).catch((error) => {
				setCountryData(null);
			});
		}
	}, [props.match.params.name]);
	  
	let cname = <p>Country name: {props.match.params.name}</p>;
	  
	if (countryData) {
		console.log("Country data loaded");
		return (
			<div>
				<div>{cname}</div>
				<p>Top level domain: {countryData.topLevelDomain[0]}</p>
				<p>Capital: {countryData.capital}</p>
				<p>Population: {countryData.population}</p>
				<p>Area: {countryData.area} km²</p>
				<p><Link to='/'>Return to search page...</Link></p>
			</div>
		);
	}
	else {
		return (
			<div>
				{cname}
				<p>No matching country</p>
			</div>
		);
	}
}

export default Country;