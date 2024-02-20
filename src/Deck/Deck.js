import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { readDeck, deleteDeck, deleteCard } from '../utils/api/index'
import Study from './DeckStudy'
import DeckList from './DeckList'
import CardList from '../Cards/CardList'


// this is a desk view showing all CARDS in a deck 

// this component is mostly done just need to debug 
/*
    done --> 
    - use states 
    - use effect --> right now we're getting the data from the apis 
    - map over cards to show info 
    - use card template in bootstrap to design cards 
    - delete screen 

    need to do --> 
    - make sure buttons -- study, edit, trash, add card -- are aligned properyl 

*/

// this file displays all info about a deck -- basically all cards in deck 
function Deck({ decks, setDecks }) {
    const { deckId, cardId } = useParams()
    const history = useHistory() 

    const [cards, setFlashCards] = useState()

    useEffect(() => {
        async function loadDecks() {
            try {
            const decksFromAPI = await readDeck() // do we need readDeck or listDeck
            setDecks(decksFromAPI)

            // const cardsFromAPI = await readCard()
            // setCards(cardsFromAPI)
            } catch(error) {
                throw new Error(`Deck ${deckId} had an error: ${error}`)
            }
        }
        loadDecks()
    }, [deckId])


    // delete a card
    const handleDelete = (id) => {
        if (window.confirm('Delete this card? You will not be able to recover it.')) {
            deleteCard(cardId)
        }
    }

    // const list all cards : 
    return (
        <div>
            <Router>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{decks.name}</li> {/* waht do i reference the deck name to */}
                </ol>
            </nav>
            <h3>{decks.name}</h3> {/* edit dck name correctly */}
            <p>{decks.description}</p>
            <Link to={`/decks/${deckId}/edit`}>
                <button className='btn btn-secondary'>
                    Edit
                </button>
            </Link>
            <Link to={`/decks/${deckId}/study`}>
                <button className='btn btn-primary'>
                    Study
                </button>
            </Link>
            <Link to={`/decks/${deckId}/cards/new`}>
                <button className='btn btn-primary'>
                    Add Cards
                </button>
            </Link>
            <button onClick={handleDelete} className="btn btn-danger bi bi-trash"></button>
            <h2>Cards</h2>
            <CardList />
            <div className='text-right mb-1'>
                <Link to={`/decks/${deckId}/edit`}>
                    <button type='button' className='btn btn-secondary bi bi-pencil'>
                    Edit
                    </button>
                </Link>
                <button 
                className='btn btn-danger bi bi-trash3 fill text-right mb-1' 
                onSubmit={handleDelete}>
                </button>
            </div>
            <Switch>
                <Route path={`/decks/${deckId}`}></Route>
            </Switch>
            </Router>
        </div>
    )
}

export default Deck;