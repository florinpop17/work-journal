import React, { Component } from 'react';
import { FlashCard } from './FlashCard';

// Three type of answers for the card questions
const KNOW = 2;
const MEH = 1;
const NO = 0;
const ANSWER_TYPES = [KNOW, MEH, NO];

class Deck extends Component {
    state = {
        activeCardIndex: 0,
        answers: [],
        showAnswer: false,
        gameOver: false
    }

    componentWillReceiveProps = (nextProps) => {
        const { deck } = this.props;

        if (nextProps.deck !== deck) {
            this.resetState();
        }
    }

    handleToggleCard = () => {
        this.setState({ showAnswer: !this.state.showAnswer });
    }

    selectAnswer = (answer) => {
        const { activeCardIndex, answers } = this.state;
        const cardsLength = this.props.deck.cards.length;
        const newActiveCardIndex = activeCardIndex + 1;

        answers.push(answer);

        if (newActiveCardIndex >= cardsLength) {
            this.setState({
                answers,
                gameOver: true,
            });
        } else {

            this.setState({
                activeCardIndex: newActiveCardIndex,
                answers,
                showAnswer: false
            });
        }
    }

    resetState() {
        this.setState({
            activeCardIndex: 0,
            answers: [],
            showAnswer: false,
            gameOver: false
        })
    }

    render () {
        const { activeCardIndex, showAnswer, gameOver } = this.state;
        const { deck } = this.props;

        if( !deck ) return (
            <h1> Please select a deck to start </h1>
        );

        if( gameOver ) return (
            <h1> Game over! </h1>
        );

        const card = deck.cards[activeCardIndex];

        return ( 
            <div className="main">
                <FlashCard
                    front={card.question}
                    back={card.answer}
                    showAnswer={showAnswer}
                    handleToggleCard={this.handleToggleCard}
                    key={card.id}
                />
        
                <div className="action-buttons">
                    <button onClick={() => this.selectAnswer(ANSWER_TYPES[0])}>
                        <i className="fa fa-smile-o"></i> I knew it
                    </button>
                    <button onClick={() => this.selectAnswer(ANSWER_TYPES[1])}>
                        <i className="fa fa-meh-o"></i> Meh
                    </button>
                    <button onClick={() => this.selectAnswer(ANSWER_TYPES[2])}>
                        <i className="fa fa-frown-o"></i> Not this time
                    </button>
                </div>
            </div>
        );
    }
}

export { Deck };