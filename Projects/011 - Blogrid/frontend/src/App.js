import React, { Component } from 'react';
import { BlogList } from './components';
import mockCards from './mockCards';

class App extends Component {
    state = {
        cards : mockCards
    }

    render() {
        const { cards } = this.state;
        return (
            <div>
                <h1>My App</h1>
                <BlogList cards={cards}/>
            </div>
        );
    }
}

export default App;
