import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { readDeck } from '../utils/api/index'
import DeckView from './DeckView'
import DeckList from './DeckList' // do i need 
import RestartDeck from './RestartDeck'
import NotEnoughCards from '../Cards/NotEnoughCards'

// REVISED AND REVIEWED -- need to look over 
function DeckStudy({ cards, setCards, decks, setDecks }) {
    const history = useHistory()
    const { deckId } = useParams()
    const [cardIndex, setCardIndex] = useState(0)

    /* const initialFlashCardState = {
        cardNumber: 1,
        cardFlipped: false,
        nextButton: false,
      };  -- do i need this instead ?  */

    useEffect(() => {
        async function loadDecks() {
           // to we need readDeck 
           const decksFromAPI = await readDeck(deckId)
           setDecks(decksFromAPI)
        }
        loadDecks()
    }, [deckId]) 

    const [flip, setFlipped] = useState(false)

    const handleFlip = () => {
        setFlipped(!flip)
    }
    // handles next button 
    const handleNext = () => {
        if (cardIndex < cards.length - 1) { 
            setCardIndex(cardIndex + 1)
        }
        return null 
        // handle restart here 
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item">
                        <Link to={`/decks/:deckId`}></Link>
                        {deckId.name} {/* need to figure this out  */}
                    </li> 
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <Link to={`/decks/${deckId}/study`}></Link>
            <h1>Study: {deckId.name}</h1>
            <div>
                {flip ? ( 
                <div class="card w-75">
                <div class="card-body">
                    {/* need to adjust the numbers to active numbers */}
                    <h5 class="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p class="card-text">{cards.back}</p>
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
                        <h5 class="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                        <p class="card-text">{cards.front}</p>
                        <button 
                        className="btn btn-secondary"
                        onClick={handleFlip}
                        >
                            Flip
                        </button>
                    </div>
                </div>
                )}
                {/* <RestartDeck /> <NotEnoughCards /> */}
            </div>
        </div>
    )
}

export default DeckStudy;