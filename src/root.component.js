import React from 'react';
import { Provider } from 'react-redux';
import Counter from './counter';
import "./sass/main.scss";
import AsideMenu from "./componentes/AsideMenu"
import NavBar from "./componentes/NavBar";

export default class Root extends React.Component {

    state = {
        store: this.props.store,
        globalEventDistributor: this.props.globalEventDistributor,
    };

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {

        return <div id="app">
            <NavBar />
            <AsideMenu />
        </div>
    }
}