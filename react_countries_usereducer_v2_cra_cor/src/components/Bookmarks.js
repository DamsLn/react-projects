import React from "react";
import { Link } from 'react-router-dom';

// Composant Bookmarks correspondant à la liste des bookmarks
const Bookmarks = (props) => {
  
  if (!props.countries.length) {
	  return (
		<div>
			<h2>
				Bookmarks
			</h2>
			<p>
				No bookmark available
			</p>
			<div>
				<Link to="/">Return to search page...</Link>
			</div>
		</div>
	  );
  }
  else
  {
	  return (
				<div>
					<h2>
						Bookmarks
					</h2>
					{					
						props.countries.map((obj, i) => {
							return (
									<p key={i}>
										<Link to={'/country/'+obj.name}>{i+1}. {obj.name}</Link>
									</p>
							);
						})
					}
					<div>
						<Link to="/">Return to search page...</Link>
					</div>
				</div>
		);
  }
}

export default Bookmarks;