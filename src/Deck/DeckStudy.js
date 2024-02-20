import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { readDeck } from '../utils/api/index'
// import { fileURLToPath } from 'url'
import DeckView from './DeckView'
import RestartDeck from './RestartDeck'
import NotEnoughCards from '../Cards/NotEnoughCards'


// need to do next button 
// should i do a separate file for the back of the button ? 
// need to import list decks 

/*
    - to do : 
    - check the states that are being used 
    - need to check if rendering title is correct
    - cards shown one at a time, front side first 
        - is this done with flip function ? 
    - next button for back of card 

    done 
    - breadcrumb 
    - deck title 
*/

function DeckStudy({ cards, setCards, decks, setDeck, handleDelete}) {
    const history = useHistory()
    const { deckId } = useParams()

    /* const initialFlashCardState = {
        cardNumber: 1,
        cardFlipped: false,
        nextButton: false,
      };  -- do i need this instead ?  */

    useEffect(() => {
        async function loadDecks() {
           // to we need readDeck 
        
           const decksFromAPI = await readDeck()
           setDeck(decksFromAPI)
        }
        loadDecks()
    }, []) 

    // does this need to be useState(initialFlashCard)
    const cardFront = cards.front
    const cardBack = cards.back
    const [flip, setFlipped] = useState(false)


    // flips card
    // will this show the back of the card ??
    const handleFlip = () => {
        setFlipped(!flip)
    }
    // handles next button 
    const handleNext = () => {
        if (setCards < cards.length - 1) {
            setCards(cards + 1)
        } /*else {
            setFlashCards(0) // restarts cards -- do i need this bc RestartDeck handles the rest?
        } */
    }

    // need to do back of card 
    // next button appears after card is flipped 



    // include breadcrumb -- bootstrap 
    // links to home 
    // need to implement back of cards 
    // and include study.js

    return (
        <div>
            <Router>
                <Switch>
                    <Route path={`/decks/${deckId}/study`}>
                        <DeckStudy />
                    </Route>
                </Switch>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item">
                        <Link to={`/decks/:deckId`}></Link>
                        {decks.name} {/* name of the current deck */}
                    </li> 
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <Link to={`/decks/${deckId}/study`}></Link>
            <h1>Study: {decks.name}</h1>
            <div>
                {flip ? (
                <div class="card w-75">
                <div class="card-body">
                    {/* need to adjust the numbers to active numbers */}
                    <h5 class="card-title">Card {cards.id} of {cards.length}</h5>
                    <p class="card-text">{cards.description}</p>
                    <div>{cardBack}</div>
                    <button 
                    className="btn btn-secondary"
                    onClick={handleFlip}
                    >
                    Flip
                    </button>
                    <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    >
                        Next
                    </button>
                    </div>
                </div>
                ) : (
                    <div class="card w-75">
                    <div class="card-body">
                        {/* need to adjust the numbers to active numbers */}
                        <h5 class="card-title">Card {cards.id} of 3</h5>
                        <p class="card-text">{cards.description}</p>
                        <button 
                        className="btn btn-secondary"
                        onClick={handleFlip}
                        >
                        Flip
                        </button>
                    </div>
                </div>
                )}
                <RestartDeck component={RestartDeck}/> {/* is this the right place to put this */}
                <NotEnoughCards component={NotEnoughCards}/>
            </div>
            </Router>
        </div>
    )
}

export default DeckStudy;