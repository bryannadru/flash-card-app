import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useParams, useHistory } from 'react-router-dom'
import { deleteDeck, readDeck } from '../utils/api/index'
import { ErrorBoundary } from 'react-error-boundary'
import DeckList from './DeckList'
// need to add Routes in all files !!!!
// first page listing all decks --> home page
// this file needs to show a list of Decks !!!

// this is parent component 
function DeckView() {
    const { deckId } = useParams()
    const history = useHistory()

    // sets the deck useState --> parent state 
    const [decks, setDecks] = useState([])
    const [cards, setCards] = useState([]) 

    useEffect(() => {
        async function loadDecks() {
            const decksFromAPI = await readDeck()
            console.log(decksFromAPI)
            setDecks(decksFromAPI)
        }
        loadDecks()
    }, [])

    // delete a deck 
    const handleDelete = (id) => {
        if (window.confirm('Do you really want to delete this deck? You will not be able to recover it.')) {
            deleteDeck(id);
            
        setDecks((updatedDeck) => 
            // setDecks(decks => decks.filter(deck => deck.id !== id));
            updatedDeck.filter((deck) => deck.id !== id)) // creates a new array with all decks that do not match id
            // updates the state to not include deleted deck id  
        history.push('/')      
    }

    return (
        <Router>
        <div>
            <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
                <Link to='/decks/new'>
                <button 
                type="button" 
                className="btn btn-secondary text-left"> {/* is this left correct */}
                    + Create Deck
                </button>
                </Link>
                <Route exact path='/'>
                    <DeckList decks={decks} onDelete={handleDelete}/>
                </Route>
            </ErrorBoundary>
        </div>
        </Router>
        )
    }
}


export default DeckView;