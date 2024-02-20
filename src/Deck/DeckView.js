import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useParams, useHistory } from 'react-router-dom'
import { deleteDeck } from '../utils/api/index'
import Deck from './Deck'
import DeckList from './DeckList'
// need to add Routes in all files !!!!
// first page listing all decks --> home page

// this file needs to show a list of Decks !!!

// is deck and cards the right way to reference 
function DeckView() {

    /* 
    done 
    - layout 
    - links to every button 
    - need to figure out how to reference deck.name and card.length correctly 
    - need to list all decks
    */

    const { deckId } = useParams()
    const history = useHistory()

    // sets the deck useState --> parent state 
    const [decks, setDecks] = useState()
    const [cards, setCards] = useState() 

    // delete a deck 
    const handleDelete = (id) => {
        if (window.confirm("Do you really want to delete this deck?")) {
            deleteDeck(deckId);
            
        setDecks((updatedDeck) => 
            updatedDeck.filter((deck) => deck.id !== id))
        history.push('/')
        }    
    }

    return (
    <div>
        <Router>
            <Switch>
                <Route exact path='/' component={DeckView}></Route> {/* is this right */}
            <Link to='/decks/new'>
            <button 
            type="button" 
            className="btn btn-secondary text-left"> {/* is this left correct */}
                + Create Deck
            </button>
            </Link>
            <DeckList />
            </Switch>
        </Router>
    </div>
    )
}

{/* <Link className="btn btn-primary mx-1" to={`/decks/${deck.id}/study`} >Study</Link>
<button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(deck)}>
           Delete
</button> */}


/* <Router>
<Link to='/'></Link>
<Switch>
    <Route exact={true} path='/'>
        <Home />
    </Route>
</Switch>
</Router>
)
*/

export default DeckView;