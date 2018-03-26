import React, { Component } from 'react';

class FlashCard extends Component {
    state = {
        answer: false
    }

    showAnswer = () => {
        this.setState({ answer: true });
    }

    hideAnswer = () => {
        this.setState({ answer: false });
    }

    render () {
        const { answer } = this.state;
        const { front, back } = this.props;

        return (
            <div className="flashcard-container">
                <div className={`flashcard ${answer && `show-answer`}`}>
                    <div className="front">
                        { front }
                        <button onClick={this.showAnswer}>Show Answer</button>
                    </div>
                    <div className="back">
                        { back }
                        <button onClick={this.hideAnswer}>Hide Answer</button>
                    </div>
                </div>
            </div>
        );
    }
}

export { FlashCard };