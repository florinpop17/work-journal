import React, { Component } from 'react';
import { BlogList, SinglePage } from './components';
import mockCards from './mockCards';

class App extends Component {
    state = {
        cards: mockCards,
        selectedCard: mockCards[1]
    }

    render() {
        const { cards, selectedCard } = this.state;
        return (
            <div>
                {/* <BlogList cards={cards} /> */}
                <SinglePage card={selectedCard} />
            </div>
        );
    }
}

export default App;
