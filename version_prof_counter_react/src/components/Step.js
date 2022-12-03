import React from 'react';
import Counter from './Counter';
import MyInput from './MyInput';

const Step = (props) => {
    const [step, setStep] = React.useState(1);

    function handleStepChange(step) {
        setStep(step);
    }

    return (
        <div>
            <Counter color={'#008CBA'} step={step} />
            <MyInput onStepChange={handleStepChange}/>
        </div>
    );
}

export default Step;