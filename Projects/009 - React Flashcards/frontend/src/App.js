import React, { Component } from 'react';
import { FlashCard } from './components';
import { Sidebar } from './components';

const dummyDecks = [{
    id: 1,
    name: 'CSS',
    cards: [{
        id: 1,
        question: 'Question of CSS #1',
        answer: 'Answer of CSS #1'
    },{
        id: 2,
        question: 'Question of CSS #2',
        answer: 'Answer of CSS #2'
    },{
        id: 3,
        question: 'Question of CSS #3',
        answer: 'Answer of CSS #3'
    }]
}, {
    id: 2,
    name: 'JS',
    cards: [{
        id: 1,
        question: 'Question of JS #1',
        answer: 'Answer of JS #1'
    },{
        id: 2,
        question: 'Question of JS #2',
        answer: 'Answer of JS #2'
    },{
        id: 3,
        question: 'Question of JS #3',
        answer: 'Answer of JS #3'
    }]
}, {
    id: 3,
    name: 'React',
    cards: [{
        id: 1,
        question: 'Question of React #1',
        answer: 'Answer of React #1'
    },{
        id: 2,
        question: 'Question of React #2',
        answer: 'Answer of React #2'
    },{
        id: 3,
        question: 'Question of React #3',
        answer: 'Answer of React #3'
    }]
}]

class App extends Component {
    state = {
        decks: dummyDecks,
        showAnswer: false
    }

    handleToggleCard = () => {
        this.setState({ showAnswer: !this.state.showAnswer });
    }

    render() {
        const { decks, showAnswer } = this.state;
        const { question, answer } = decks[0].cards[0];

        return (
            <div class="container">
                <Sidebar decks={decks} />
                
                <div className="main">
                    <FlashCard
                        front={question}
                        back={answer}
                        showAnswer={showAnswer}
                        handleToggleCard={this.handleToggleCard}
                    />

                    <div className="action-buttons">
                        <button>
                            <i className="fa fa-smile-o"></i> I knew it
                        </button>
                        <button>
                            <i className="fa fa-meh-o"></i> Meh
                        </button>
                        <button>
                            <i className="fa fa-frown-o"></i> Not this time
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
