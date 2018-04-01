import React, { Component } from 'react';
import { FlashCard } from './FlashCard';
import { CSSTransitionGroup } from 'react-transition-group';

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

    componentDidMount = () => {
        const { deck } = this.props;

        // Fill in the array with 0's for each card
        const answers = Array(deck.cards.length).fill(0);

        this.setState({
            answers
        });
    }

    handleToggleCard = () => {
        this.setState({ showAnswer: !this.state.showAnswer });
    }

    selectAnswer = (answer) => {
        const { activeCardIndex, answers } = this.state;
        const cardsLength = this.props.deck.cards.length;
        let newActiveCardIndex = activeCardIndex + 1;

        answers[activeCardIndex] = answer;

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
        const { deck } = this.props;

        this.setState({
            activeCardIndex: 0,
            answers: Array.fill(deck.cards.length).fill(0),
            showAnswer: false,
            gameOver: false
        })
    }

    render () {
        const { answers, activeCardIndex, showAnswer, gameOver } = this.state;
        const { deck } = this.props;
        const totalCorrectAnswers = answers.filter(answer =>  answer === KNOW).length;
        const totalCards = deck.cards.length;

        if( !deck ) return (
            <h1> Please select a deck to start </h1>
        );

        if( gameOver ) return (
            <h1> Game over! </h1>
        );

        const card = deck.cards[activeCardIndex];

        return ( 
            <div className="main">
                <h1>You answered {totalCorrectAnswers} questions correctly out of {totalCards} questions.</h1>
                <CSSTransitionGroup
                    transitionName="flashcard-animation"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <FlashCard
                        front={card.question}
                        back={card.answer}
                        showAnswer={showAnswer}
                        handleToggleCard={this.handleToggleCard}
                        key={card.id}
                    />
                </CSSTransitionGroup>
        
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