import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { BlogList, SinglePage } from './components';
import mockCards from './mockCards';

const Footer = styled.footer`
    bottom: 0;
    background-color: #222;
    padding: 10px;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    width: 100vw;
    z-index: 999;

    & p {
        margin: 0;
        letter-spacing: 2px;
    }

    & i {
        color: red;
    }

    & a {
        color: #3C97BF;
        margin: 0 5px;
        text-decoration: none;
    }
`;

class App extends Component {
    state = {
        cards: mockCards,
    }

    render() {
        const { cards } = this.state;

        return (
            <Router>
                <div>
                    <Route exact path="/" render={(props) => (<BlogList cards={cards} {...props}/>)} />
                    <Route path="/post/:id" render={(props) => (<SinglePage cards={cards} {...props} />)} />

                    <Footer>
                        <p>
                            Created with <i className="fa fa-heart"></i> by 
                            <a target="_blank" rel="noopener noreferrer" href="http://florin-pop.com">Florin Pop</a>
                            - More on
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/florinpop17/work-journal">Github</a>
                            - Inspired from Webflow.io
                            <a target="_blank" rel="noopener noreferrer" href="http://template-gridded.webflow.io/">Gridded</a>
                        </p>
                    </Footer>
                </div>
            </Router>
        );
    }
}

export default App;
