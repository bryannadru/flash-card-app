import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { readDeck, readCard } from '../utils/api/index'
import DeckView from './DeckView'
import DeckList from './DeckList' // do i need 
import RestartDeck from '../Cards/RestartDeck'
import NotEnoughCards from '../Cards/NotEnoughCards'


function DeckStudy({ restartTask }) {
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [cardIndex, setCardIndex] = useState(0)
    const [ cards, setCards ] = useState([])
    const [decks, setDecks] = useState({ cards: [] })
    const [flip, setFlipped] = useState(false)

    useEffect(() => {
        async function loadDecks() {
            try {
                const decksFromAPI = await readDeck(deckId)
                setDecks(decksFromAPI)
                
                const cardsFromAPI = decksFromAPI.cards
                setCards(cardsFromAPI)
            } catch (error) {
                console.error('Failed to load data', error)
            }
        }
        loadDecks()
    }, [deckId, cardId]) 

    const handleFlip = () => {
        setFlipped(!flip)
    }
    
    const handleNext = () => {
        if (cards && cardIndex < cards.length - 1) { 
            setCardIndex(cardIndex + 1)
            setFlipped(false)
        } else {
            return <RestartDeck restartTask={restartTask} />
        }
    }

    if (cards.length < 3) {
        return <NotEnoughCards cards={cards} />
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{decks.name}</Link>
                    </li> 
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <Link to={`/decks/${deckId}/study`}></Link>
            <h1>Study: {decks.name}</h1>
            <div className="card w-75">
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{flip ? cards[cardIndex].back : cards[cardIndex].front}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                    {flip && (
                        <button className="btn btn-primary m-1" onClick={handleNext}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeckStudy;