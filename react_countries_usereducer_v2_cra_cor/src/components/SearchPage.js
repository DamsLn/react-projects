import React, { useReducer, useState, useEffect } from "react";
import { Switch, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import Bookmarks from './Bookmarks';
import Country from './Country';
import axios from "axios";
import '../styles/star.css'

// Etat initial de la liste des pays
const initialCountries = [];

// Reducer permettant de gérer les actions sur la liste des pays
const countriesReducer = (state, action) => {
  switch (action.type) {
    // Action de récupération de la liste des pays
	case 'GET_COUNTRIES':
	  return action.data;
	// Action de sélection d'un pays dans la liste (un seul pays est
	// sélectionné à la fois)
    case 'SET_SELECTED':
	  return state.map(country => {
        // Pour tous les pays de la liste :
		if (action.name !== '') {		
			// Si le texte saisi n'est pas vide...
			if (country.name.toLowerCase().startsWith(action.name.toLowerCase())) {
			  // Si un nom de pays coïncide dans la liste, alors le pays courant
			  // est marqué comme sélectionné
			  return { ...country, selected: true };
			} else {
			  // Sinon, le pays courant est marqué comme non sélectionné
			  return { ...country, selected: false };
			}
		} else {
			// Sinon (texte saisi vide), le pays courant est marqué comme
			// non sélectionné
			return { ...country, selected: false };
		}
      });
	// Action d'ajout d'un bookmark sur un pays (plusieurs pays peuvent être
	// bookmarkés en même temps)
	case 'ADD_BOOKMARK':
      return state.map(country => {
        // Pour tous les pays de la liste :
		if (country.name === action.name) {
          // Si le pays courant correspond au pays choisi dans l'action,
		  // alors le pays courant passe en bookmark
		  return { ...country, bookmark: true };
        } else {
          // Sinon, l'état du pays courant le change pas
		  return country;
        }
      });
	// Action de retrait d'un bookmark sur un pays
	case 'REMOVE_BOOKMARK':
      return state.map(country => {
        // Pour tous les pays de la liste :
		if (country.name === action.name) {
          // Si le pays courant correspond au pays choisi dans l'action,
		  // alors le pays courant n'est plus en bookmark
		  return { ...country, bookmark: false };
        } else {
          // Sinon, l'état du pays courant ne change pas
		  return country;
        }
      });
	// Action de suppression de tous les bookmarks
	case 'CLEAR_BOOKMARKS':
	  // Pour tous les pays de la liste :
	  return state.map(country => {
        // Pour le pays courant, on retire le bookmark
		return { ...country, bookmark: false};
	  });
    // Action par défaut : l'état retourné est identique à
	// l'état en entrée
	default:
      return state;
  }
};

// Composant SearchPage correspondant à la page de recherche de pays
const SearchPage = (props) => {
	
  // Définition de la donnée d'état countries correspondant à la liste des pays
  // avec une gestion par un reducer à travers le hook useReducer
  // - countriesReducer : reducer utilisé
  // - initialCountries : valeur initiale de la liste des pays 
  // - countries :liste des pays à jour
  // - dispatch : fonction à appeler pour exécuter des actions sur la liste
  // des pays et déclencher un nouveau rendu du composant
  const [countries, dispatch] = useReducer(
    countriesReducer,
    initialCountries
  );
  
  // Définition de la donnée d'état search correspondant au texte
  // saisi dans le champ de recherche avec une gestion par le hook useState
  // - search : le texte saisi à jour
  // - setSearch : fonction à appeler pour modifier la valeur de la donnée
  // et déclencher un nouveau rendu du composant
  const [search, setSearch] = useState('');
  
  // Hook d'effet avec 2ème paramètre vide : la requête GET est effectuée
  // sur l'API une seule fois au montage du composant pour obtenir la liste
  // des pays
  useEffect(() => {
	document.title = "Country search";
	axios.get('https://restcountries.com/v2/all?fields=name')
	.then((response) => {
		let c = response.data;
		// La liste de pays retournée par la requête GET sur l'API est un tableau
		// d'objets avec un seul champ 'name' pour chaque objet
		// On ajoute deux champs supplémentaires pour chaque objet :
		// - bookmark : booléen indiquant si le pays est en bookmark ou non
		// - selected : booléen indiquant si le pays figure dans les résultats de
		// la recherche ou non
		c = c.map((obj) => {return {...obj, bookmark: false, selected: false};});
		// On exécute l'action GET_COUNTRIES pour mettre à jour la liste
		// des pays à partir des données reçues du serveur
		dispatch({ type: 'GET_COUNTRIES', data: c });
	});
	
  }, []);
  
  const handleSearchChange = (newSearch) => {
	  // Mise à jour de la donnée d'état search
	  // (fonction appelée lorsque l'événement onChange est déclenché
	  // sur le champ de recherche)
	  setSearch(newSearch);
  }

  const handleCountryChange = (newCountry) => {
	if (countries.length) {
		// Si la liste des pays a été chargée, on peut
		// effectuer une action de sélection à l'intérieur
		dispatch({ type: 'SET_SELECTED', name: newCountry });
	}
  }
  
  const handleBookmarkChange = (country) => {
    // On exécute les actions ADD_BOOKMARK ou REMOVE_BOOKMARK
	// (fonction appelée lorsque l'événement onChange est déclenché
	// sur les cases à cocher de mise en bookmark)
	if (country.bookmark) {
	  dispatch({ type: 'REMOVE_BOOKMARK', name: country.name });
	} else {
	  dispatch({ type: 'ADD_BOOKMARK', name: country.name });
	}
  };
  
  const handleBookmarksClear = () => {
	  // On exécute l'action CLEAR_BOOKMARK (fonction appelée lorsque
	  // l'événement onCLick est déclenché sur le bouton de suppression
	  // des bookmarks)
	  dispatch({ type: 'CLEAR_BOOKMARKS' });
  }

  // Rendu du composant, dépendant de la route :
  // - si la route est '/' : on affiche le composant SearchBar (champ de recherche)
  // - si la route est '/bookmarks' : on affiche le composant Bookmark (liste des bookmarks)
  // - si la route est '/country/:name' : on affiche le omposant Country (détails sur un pays)
  return (
	<Switch>
		<Route exact path='/' render={
				() => <SearchBar countries={countries}
								 search={search}
								 onSearchChange={handleSearchChange}
								 onCountryChange={handleCountryChange}
								 onBookmarkChange={handleBookmarkChange}
								 onBookmarksClear={handleBookmarksClear}
					  />
		}
		/>
		<Route exact path='/bookmarks' render={
				() => <Bookmarks countries={countries.filter((obj) => {return obj.bookmark;})}
				      />
		}
		/>
		<Route exact path='/country/:name' component={Country} />
	</Switch>
  );
}

export default SearchPage;
