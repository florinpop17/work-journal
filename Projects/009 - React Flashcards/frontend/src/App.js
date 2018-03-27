import React, { Component } from 'react';
import { FlashCard } from './components';
import { Sidebar } from './components';
import { Modal } from './components';

import dummyDecks from './dummyDecks';

const getRandomId = () => Math.random().toString();

class App extends Component {
    state = {
        decks: dummyDecks,
        editDeckName: '',
        newDeckName: '',
        showAnswer: false,
        showAddDeckModal: false,
        showEditDeckModal: false,
        selectedToEditDeckId: undefined
    }

    handleAddDeck = (e) => {
        e.preventDefault();

        const { decks, newDeckName } = this.state;

        if (newDeckName !== '') {
            const newId = getRandomId();

            decks.push({
                id: newId,
                name: newDeckName,
                cards: []
            });

            this.setState({
                decks,
                showAddDeckModal: false,
                showEditDeckModal: true,
                editDeckName: newDeckName,
                selectedToEditDeckId: newId, 
                newDeckName: ''
            });
        } else {
            alert('Please enter a name for the new Deck!');
        }
    }

    handleToggleCard = () => {
        this.setState({ showAnswer: !this.state.showAnswer });
    }

    handleAddCardToDeck = (e) => {
        e.preventDefault();

        const { decks, selectedToEditDeckId } = this.state;
        const newDecks = decks.map(deck => {
            if (deck.id === selectedToEditDeckId) {
                const { cards } = deck;

                cards.push({
                    id: getRandomId(),
                    question: '',
                    answer: ''
                });

                // Add new card to the cards array
                const newDeck = {
                    ...deck,
                    cards
                };

                return newDeck; 
            }

            return deck;
        });

        this.setState({
            decks: newDecks
        });
    }

    handleCloseAddDeckModal = () => {
        this.setState({ showAddDeckModal: false });
    }

    handleCloseEditDeckModal = () => {
        this.setState({ showEditDeckModal: false });
    }

    handleShowAddDeckModal = () => {
        this.setState({ showAddDeckModal: true });
    }

    handleShowEditDeckModal = (selectedToEditDeckId) => {
        this.setState({
            showEditDeckModal: true,
            selectedToEditDeckId
        });
    }

    updateCardWithId = (e, cardId, type) => {
        const { decks, selectedToEditDeckId } = this.state;
        const inputValue = e.target.value;

        const newDecks = decks.map(deck => {
            if (deck.id === selectedToEditDeckId) {
                const { cards } = deck;
                const newCards = cards.map(card => {
                    if (card.id === cardId) {
                        return {
                            ...card,
                            [type]: inputValue
                        };
                    }

                    return card;
                });

                return {
                    ...deck,
                    cards: newCards
                }
            }
            return deck;
        });

        this.setState({
            decks: newDecks
        });
    }

    updateDeckName = (e) => {
        this.setState({ newDeckName: e.target.value });
    }

    render() {
        const { 
            decks,
            editDeckName,
            newDeckName,
            showAnswer,
            showAddDeckModal,
            showEditDeckModal,
            selectedToEditDeckId
        } = this.state;
        const { question, answer } = decks[0].cards[0];

        const selectedToEditDeck = decks.find(deck => deck.id === selectedToEditDeckId);

        return (
            <div className="container">
                <Modal
                    title={'Add new Deck of Flashcards'}
                    showModal={showAddDeckModal}
                    handleCloseModal={this.handleCloseAddDeckModal}
                >
                    <form onSubmit={this.handleAddDeck}>
                        <div className="form-control">
                            <label>Deck Name:</label>
                            <input type="text" value={newDeckName} onChange={this.updateDeckName}/>
                        </div>
                        <button type="submit" className="secondary">Continue</button>
                    </form>
                </Modal>

                <Modal
                    title={`Edit ${editDeckName} Deck`}
                    showModal={showEditDeckModal}
                    handleCloseModal={this.handleCloseEditDeckModal}
                >
                    <form>
                        <h3 className="form-title">
                            List of Cards:
                            <button className="icon" onClick={this.handleAddCardToDeck}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </h3>

                        { selectedToEditDeck && selectedToEditDeck.cards.map((card, index) => (
                            <div key={card.id}>
                                <div className="form-control">
                                    <label>{ `Q${index}:` }</label>
                                    <textarea
                                        value={card.question}
                                        onChange={(e) => this.updateCardWithId(e, card.id, 'question')}
                                    />
                                    <label>{ `A${index}:` }</label>
                                    <textarea
                                        value={card.answer}
                                        onChange={(e) => this.updateCardWithId(e, card.id, 'answer')}
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                </Modal>

                <Sidebar
                    decks={decks}
                    handleShowAddDeckModal={this.handleShowAddDeckModal}
                    handleShowEditDeckModal={this.handleShowEditDeckModal}
                />
                
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
