import React from 'react';
import '../styles/Counter.css';

/*
class Counter extends React.Component {
	constructor(props) {
		// Noter que l'on passe props au constructeur
		// de la classe de base
		super(props);
		this.state = {score: 0};
	}
	
	componentDidMount() {
		// Traitement après insertion dans le DOM virtuel
		console.log("componentDidMount");
	}

	componentWillUnmount() {
		// Traitement avant suppression du DOM virtuel
		console.log("componentWillUnmount");
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// Le composant doit-il être rendu à nouveau ?
		if (this.props.step !== nextProps.step) {
			return true;
		}
		if (this.state.score !== nextState.score) {
			return true;
		}
		// Pas de rendu si les valeurs de propriétés ou de
		// state n'ont pas changé
		return false;
	}
	
	componentDidUpdate(prevProps, prevState) {		
		// Traitement si composant mis à jour
		if (this.props.step !== prevProps.step) {
			console.log("componentDidUpdate step");
		}
		if (this.state.score !== prevState.score) {
			console.log("componentDidUpdate score");
			// Met à jour le titre du document via l’API du navigateur
			// (exemple avec syntaxe "template litterals")
			document.title = `The score is ${this.state.score}`;
		}	  
	}

	upVote() {
		this.setState({score: this.state.score
		               + this.props.step});
	}

	render() {
		return (
			<div>
				<button
					className='counter'
					style={{backgroundColor: this.props.color,
					        color: 'white'}}
					onClick={() => this.upVote()}>Up vote!</button>
				<p>Score : {this.state.score}</p>
			</div>
		);
	}
}
*/

const Counter = (props) => {
	const [score, setScore] = React.useState(0);
	
	// Similaire à componentDidMount
	React.useEffect(() => {
		console.log("useEffect 1");
	}, []);

	// Similaire à componentDidMount et componentDidUpdate
	// avec même traitement si props ou état locaux mis à jour
	React.useEffect(() => {
		console.log("useEffect 2");
	});

	// Similaire à componentDidMount et componentDidUpdate
	// pour les props ou les état locaux passés en paramètre
	React.useEffect(() => {
		console.log("useEffect 3");
		// Si les valeurs de props.step ou de score
		// ont changé (et seulement celles-ci), met à jour le titre
		// du document via l’API du navigateur
		document.title = `The score is ${score}`;
	}, [props.step, score]);

	return (		
		<div>
			<button
				className='counter'
				style={{backgroundColor: props.color,
						color: 'white'}}
				onClick={() => setScore(score + props.step)}>Up vote!</button>
			<p>Score : {score}</p>
		</div>
	);
}

export default Counter;