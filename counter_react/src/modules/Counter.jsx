import React from "react";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "../styles/Counter.css";


const Counter = (props) => {
	let [score, setScore] = React.useState(0);
    let [step, setStep] = React.useState(0);

    console.log(step);

	React.useEffect(() => {
		document.title = `The score is ${score}`;
	}, [score, step]);

	return (
		<div>
            <div className="step-form">
                <label htmlFor="step-input">Valeur d'incrémentation :</label>
                <TextField
                    id="step-input"
                    name="step-input"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onKeyUp={(e) => {
                        /* if (e.keyCode === 13) {
                            console.log(parseInt(e.target.value));
                            setStep(step = parseInt(e.target.value));
                            setScore(score = 0);
                        } */
                        setStep(step = parseInt(e.target.value));
                        setScore(score = 0);
                    }}
                />
            </div>
            <div className="button-area">
                <Button
                    className='counter'
                    style={{backgroundColor: props.color, color: 'white'}}
                    onClick={() => setScore(score + step)}
                    variant="contained"
                >
                    Add
                </Button>
            </div>
            <div className="value-area">
                <Typography variant="h5">
                    <p>Score : {score}</p>
                </Typography>
            </div>
		</div>
	);
}

export default Counter;