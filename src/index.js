import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const f = [1,2,3,4,5];
    const e = {...f};
    return <>
        <h1>Works</h1>
        {
            JSON.stringify(e)
        }
    </>
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App></App>, rootElement);