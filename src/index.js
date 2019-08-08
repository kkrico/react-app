import React from "react";
import ReactDOM from "react-dom";
import RootComponent from "./root.component";
import { createStore, combineReducers } from "redux";
import { storeInstance } from "./store";

const globalEventDistributor = () => {

}

const rootElement = document.getElementById("root");
ReactDOM.render(<RootComponent globalEventDistributor={globalEventDistributor} store={storeInstance}></RootComponent>, rootElement);