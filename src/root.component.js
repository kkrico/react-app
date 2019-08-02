import React from 'react';
import { Provider } from 'react-redux';
import Counter from './counter';


export default class Root extends React.Component {

    state = {
        store: this.props.store,
        globalEventDistributor: this.props.globalEventDistributor,
    };

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {

        let ret = <div></div>;

        if (this.state.store && this.state.globalEventDistributor) {
            ret =
                <Provider store={this.state.store}>
                    <div style={{ marginTop: 100 }}>
                        This was rendered by App1, which is written in React.
                        <Counter globalEventDistributor={this.state.globalEventDistributor} />
                    </div>
                </Provider>
        }

        return ret;
    }
}