import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { readDeck, readCard } from '../utils/api/index'
import DeckView from './DeckView'
import DeckList from './DeckList' // do i need 
import RestartDeck from './RestartDeck'
import NotEnoughCards from '../Cards/NotEnoughCards'

// REVISED AND REVIEWED -- need to look over 
function DeckStudy() {
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [cardIndex, setCardIndex] = useState(0)

    /* const initialFlashCardState = {
        cardNumber: 1,
        cardFlipped: false,
        nextButton: false,
      };  -- do i need this instead ?  */
    const [ cards, setCards ] = useState([])
    const [ decks, setDecks ] = useState([])

    useEffect(() => {
        async function loadDecks() {
            try {
                const decksFromAPI = await readDeck(deckId)
                setDecks(decksFromAPI)
                
                const cardsFromAPI = await readCard(cardId)
                setCards(cardsFromAPI)
            } catch (error) {
                console.error('Failed to load data', error)
            }
        }
        loadDecks()
    }, [deckId, cardId]) 

    const [flip, setFlipped] = useState(false)

    const handleFlip = () => {
        setFlipped(!flip)
    }
    
    const handleNext = () => {
        if (cards && cardIndex < cards.length - 1) { 
            setCardIndex(cardIndex + 1)
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item">
                        <Link to={`/decks/:deckId`}>{decks.name}</Link>
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
                    <h5 class="card-title">Card {cardIndex + 1} of {cards.length + 1}</h5>
                    <p class="card-text">{cards.back}</p>
                    <button 
                    className="btn btn-secondary"
                    onClick={handleFlip}
                    >
                    Flip
                    </button>
                    <button
                    className="btn btn-primary m-1"
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
                        <h5 class="card-title">Card {cardIndex + 1} of {cards.length + 1}</h5>
                        <p class="card-text">{decks.name}</p>
                        <button 
                        className="btn btn-secondary"
                        onClick={handleFlip}
                        >
                            Flip
                        </button>
                    </div>
                </div>
                )}
            </div>
            {/*{cardIndex === cards.length && <RestartDeck />}
            {cards.length < 3 && <NotEnoughCards />} */}
        </div>
    )
}

export default DeckStudy;