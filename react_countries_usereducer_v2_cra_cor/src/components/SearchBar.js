import React from "react";
import { Link } from 'react-router-dom';
import '../styles/star.css'

// Composant SearchBar correspondant au champ de recherche
const SearchBar = (props) => {

  return (
	<div>
		<h2>
			Country search
		</h2>
		<p>
			<Link to='/bookmarks'>Show bookmarks ({
				props.countries.filter((obj) => { return obj.bookmark; }).length
			})
			</Link> <button type="button"
				onClick={props.onBookmarksClear}>
				Clear bookmarks
			</button>
		</p>
		<input
			type="search"
			id="country"
			value={props.search}
			placeholder="Search a country..."
			label="Country"
			onChange={(e) => {
				props.onSearchChange(e.target.value);
				props.onCountryChange(e.target.value);
			}}
		/>
		<p>
			Number of results: {props.countries.filter((obj) => { return obj.selected; }).length}
		</p>
		{
			props.countries.filter((obj) => { return obj.selected; }).map((obj, i) => {
				return (
						<p key={i}>
							<Link to={'/country/'+obj.name}>{i+1}. {obj.name}</Link>
							<input
								type="checkbox"
								className="star"
								checked={obj.bookmark}
								onChange={() => props.onBookmarkChange(obj)}
							/>
						</p>
				);
			})
		}
	</div>
  );
}

export default SearchBar;
