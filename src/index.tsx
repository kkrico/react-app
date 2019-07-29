import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./styles.scss";

interface IApp {
    color: string;
}

class App extends React.Component<IApp, {}> {

    render() {
        return (<div>
            <h1>Welcome to React with Typescript</h1>
            <p>The color of this page is: {this.props.color}</p>
        </div>
        );
    }
}

ReactDOM.render(<App color="red" />, document.getElementById("root"));