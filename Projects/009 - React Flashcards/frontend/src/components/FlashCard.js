import React from 'react';

const ToggleButton = ({ handleToggleCard }) => (
    <button className="icon" onClick={handleToggleCard}>
        <i className="fa fa-refresh"></i>
    </button>
);

const FlashCard = ({ front, back, showAnswer, handleToggleCard }) => (
    <div className="flashcard-container">
        <div className={`flashcard ${showAnswer && `show-answer`}`}>
            <div className="front">
                <h4>Q</h4>
                { front }
                <ToggleButton handleToggleCard={handleToggleCard} />
            </div>
            <div className="back">
                <h4>A</h4>
                { back }
                <ToggleButton handleToggleCard={handleToggleCard} />
            </div>
        </div>
    </div>
);

export { FlashCard };