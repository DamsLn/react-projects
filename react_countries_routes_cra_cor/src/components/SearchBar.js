import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  useEffect(() => {
	document.title = "No country";
	console.log("Mount SearchBar");
	
	axios.get('https://restcountries.com/v2/all?fields=name')
	.then((response) => {
		console.log("List of countries loaded");
		setCountries(response.data);
	});
	
  }, []);
  
  const handleCountrySelection = (event) => {
	let country = event.target.value;
	console.log(country);
	let filteredCountries = countries.filter(
		(obj) => obj.name.toLowerCase().includes(country));
	//console.log(filteredCountries);
	setFilteredCountries(filteredCountries);
  }
  
  return (
	<div>
		<input
			type="search"
			id="country"
			placeholder="Search a country..."
			list = "countries"
			onInput={e => handleCountrySelection(e)}
		/>
		{filteredCountries.map((obj, index) => {
			return (
				<div key={index}>
					<p>
						<Link to={"/"+obj.name}>{obj.name}</Link>
					</p>
					<i className="far fa-star"></i>
				</div>
			);
		})}
	</div>
  );
}

export default SearchBar;
