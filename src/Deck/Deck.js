import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { readDeck, deleteDeck, deleteCard } from '../utils/api/index'
import DeckView from './DeckView'
import CardList from '../Cards/CardList'
//import DeckStudy from './DeckStudy'
//import DeckList from './DeckList'

// REVIEWED AND REVISED 
// this is a desk view showing all CARDS in a deck 
// this file displays all info about a deck -- basically all cards in deck 
function Deck({ decks, setDecks, cards, setCards }) {
    const { deckId, cardId } = useParams()
    const history = useHistory() 

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


    // delete a card  -- make sure this function is correct 
    const handleDelete = (id) => {
        if (window.confirm('Delete this card? You will not be able to recover it.')) {
            deleteCard(id)
        }
    }

    // const list all cards : 
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{decks.name}</li>
                </ol>
            </nav>
            <h3>{decks.name}</h3>
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
            <button type='button' onClick={handleDelete} className="btn btn-danger bi bi-trash"></button>
            <h2>Cards</h2>
            <CardList />
            <div>
                <Link to={`/decks/${deckId}/edit`}>
                    <button type='button' className='btn btn-secondary bi bi-pencil'>
                    Edit
                    </button>
                </Link>
                <button type='button' onSubmit={handleDelete} className="btn btn-danger bi bi-trash"></button>
            </div>
            <Router>
                <Switch>
                    <Route path={`/decks/${deckId}`}>
                        <Deck />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Deck;