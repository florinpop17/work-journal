import React from 'react';

const Sidebar = ({ decks, handleDeleteDeck, handleShowAddDeckModal, handleSelectDeck, handleShowEditDeckModal }) => (
    <div className="sidebar">
        <h2>Available decks</h2>
        {decks ? (
            <ul className="decks">
                {decks.map(deck => (
                    <li key={deck.id}>
                        { deck.name }
                        <button className="icon" onClick={() => handleDeleteDeck(deck.id)}>
                            <i className="fa fa-ban"></i>
                        </button>
                        <button className="icon" onClick={() => handleShowEditDeckModal(deck.id)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="icon" onClick={() => handleSelectDeck(deck.id)}>
                            <i className="fa fa-play"></i>
                        </button>
                    </li>
                ))}
            </ul>
        ) : ( 
            <p> No decks available </p> 
        )}

        <button className="block fixed-bottom" onClick={handleShowAddDeckModal}>
            <i className="fa fa-plus"></i> Add new deck
        </button>
    </div>
);

export { Sidebar };