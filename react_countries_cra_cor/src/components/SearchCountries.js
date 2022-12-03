import React, { useState, useEffect } from "react";
import SearchBar from './SearchBar';
import Country from './Country';

const SearchCountries = (props) => {

  const [country, setCountry] = useState('');
  
  useEffect(() => {
	document.title = "No country";
	console.log("Mount SearchCountries");
  }, []);
  
  const handleCountryInput = (country) => {
	setCountry(country);
	console.log("Country input: ", country);
	document.title = `Country ${country}`
  }
  
  return (
	<div>
		<SearchBar onCountryInput={handleCountryInput}/>
		{country !== '' ?
			<div>
				<Country name={country} />
			</div>
			: <p>No country selected</p>}
	</div>
  );
}

export default SearchCountries;
