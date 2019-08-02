import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import RootComponent from "./root.component";

const globalEventDistributor = () => {

}

const store = {
    getState: () => {
        return {
            count: 1
        }
    },
    dispatch: () => {

    },
    subscribe: () => {

    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<RootComponent globalEventDistributor={globalEventDistributor} store={store}></RootComponent>, rootElement);