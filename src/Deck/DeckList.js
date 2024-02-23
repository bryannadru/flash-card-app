import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DeckView from './DeckView'

// REVIEWED AND REVISED 
function DeckList({ decks, handleDelete }) { // figure out the handle delete btn 
    
    const { deckId } = useParams()
    
    if (decks) {
        return (
            <div>
            {decks.map((deck) => (
                <div class="card w-75" key={deck.id}>
                    <div class="card-body">
                        <h5 class="card-title">{deck.name}</h5>
                        <p class="card-text">{deck.description}</p>
                        <Link to={`/decks/${deckId}`}>
                            <button className="btn btn-primary bi bi-eye text-left">
                                View
                            </button>
                        </Link>
                        <Link to={`/decks/${deckId}/study`}>
                            <button className="btn btn-primary bi bi-book text-left">
                                Study
                            </button>
                        </Link>
                        <button 
                            className='btn btn-danger bi bi-trash3-fill text-right'
                            onClick={() => handleDelete(deck.id)}> {/* is this right or () => deleteDeck(deckId)*/}
                        </button>
                    </div>
                </div>
            ))}
        </div>
        )
    }
}

export default DeckList;