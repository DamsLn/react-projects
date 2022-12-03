import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// Composant Country correspondant aux détails sur un pays
const Country = (props) => {

	const [country, setCountry] = useState(null);
  
	// Hook d'effet, appelé au montage du composant et quand la valeur
	// de props.match.params.name change
	useEffect(() => {
		axios.get('https://restcountries.com/v2/name/'+props.match.params.name)
		.then((response) => {
			setCountry(response.data[0]);
		})
		.catch((error) => {
			setCountry('empty');
		});

	}, [props.match.params.name]);

	if (country && country !== 'empty')
	{
	  return (
		<div>
			<h2>
				Country details
			</h2>
			<div>
				<p>Country name: {country.name}</p>
			</div>
			<div>
				<p>Top level domain: {country.topLevelDomain[0]}</p>
				<p>Capital: {country.capital}</p>
				<p>Population: {country.population}</p>
				<p>Area: {country.area} km²</p>
			</div>
			<div>
				<Link to="/">Return to search page...</Link>
			</div>
		</div>
	  );
	}
	else if (country === 'empty')
	{
	  // Rendu dans le cas où l'API interrogée ne renvoie pas de données
	  return (
		<div>
			<h2>
				Country details
			</h2>
			<div>
				<p>No data received for country name {props.match.params.name}</p>
			</div>
		</div>
	  
	  );
	}
	else
	{
	  // Rendu avant la réception des données
	  return (
		<div>
			<h2>
				Country details
			</h2>
		</div>
	  );
	}
}

export default Country;