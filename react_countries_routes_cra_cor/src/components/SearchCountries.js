import React, { useState, useEffect } from "react";
import { Switch, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import Country from './Country';

const SearchCountries = (props) => {

  return (
	<Switch>
		<Route exact path='/:name' component={Country} />
		<Route component={SearchBar} />
	</Switch>
  );
}

export default SearchCountries;
