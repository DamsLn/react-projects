import React from "react";

import Counter from "./Counter";

import "../styles/App.css";

class App extends React.Component {
    render() {
        return (
            <div className="main-container">
                <Counter />
            </div>
        );
    }
}

export default App;