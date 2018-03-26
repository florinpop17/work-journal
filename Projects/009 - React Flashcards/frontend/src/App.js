import React, { Component } from 'react';
import { FlashCard } from './components';

class App extends Component {
    render() {
        const front = 'In ce secol a trait Regina Elisabeta I?';
        const back = 'Sec XVI';
        return (
            <div className='container'>
                <FlashCard front={front} back={back} />
            </div>
        );
    }
}

export default App;
