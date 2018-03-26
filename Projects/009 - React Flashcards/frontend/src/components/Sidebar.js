import React from 'react';

const Sidebar = ({ decks, openAddDeckModal }) => (
    <div className="sidebar">
        <h2>Available decks</h2>
        {decks ? (
            <ul className="decks">
                {decks.map(deck => (
                    <li key={deck.id}>
                        { deck.name }
                        <button className="icon">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="icon">
                            <i className="fa fa-play"></i>
                        </button>
                    </li>
                ))}
            </ul>
        ) : ( 
            <p> No decks available </p> 
        )}

        <button className="block fixed-bottom" onClick={openAddDeckModal}>
            <i className="fa fa-plus"></i> Add new deck
        </button>
    </div>
);

export { Sidebar };