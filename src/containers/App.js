import React, { Component } from 'react';

import Foobar from '../components/Foobar';

import Layout from '../Layout';
import Counter from '../Counter';

import '../styles/vendor/foundation.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>App!</h1>
                {this.props.children}

                <Foobar />
            </div>
        );
    }
}
