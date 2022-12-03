import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = (props) => {

  const [countries, setCountries] = useState([]);
  
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
	var opts = document.getElementById('countries').childNodes;
	// opts.indexOf() ne fonctionne pas sur un tableau NodeList
	// il faudrait le convertir en Array avec Array.from()
	for (var i = 0; i < opts.length; i++) {
	  if (opts[i].value === country) {		
		// Un item a été sélectionné dans la liste
		props.onCountryInput(country);
		break;
	  }
	}
  }
  
  return (
	<div>
		<input
			id="country"
			placeholder="Search a country..."
			list = "countries"
			onInput={e => handleCountrySelection(e)}
		/>
		<datalist id="countries">
			{countries.map((obj, i) => (
				<option key={i} value={obj.name} />
				// pour key, voir https://fr.reactjs.org/docs/reconciliation.html
			))}
		</datalist>
	</div>
  );
}

export default SearchBar;
