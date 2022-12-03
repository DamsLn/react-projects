import React from 'react';

/*
class MyInput extends React.Component {
	//constructor(props) {
		// Noter que l'on passe props au constructeur
		// de la classe de base
	//	super(props);
	//}
	
	render() {
		return (
			<input type="text"
			       onKeyDown={(e) => {
					 if (e.key === "Enter") {
						console.log(e.target.value);
					 }
				   }}/>
		);
	}
}*/

const MyInput = (props) => {
	return (
		<input type="text"
			   onKeyDown={(e) => {
				 if (e.key === "Enter") {
					console.log(e.target.value);
					const step = parseInt(e.target.value, 10);
					props.onStepChange(step);
				 }
			   }}/>
	);
}

export default MyInput;