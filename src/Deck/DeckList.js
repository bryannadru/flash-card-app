import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DeckView from './DeckView'


function DeckList({ decks, handleDelete }) {
    
    const { deckId } = useParams
    
    if (decks) {
        const displayDecks = decks.map((deck) => {
            <div class="card w-75">
                <div class="card-body">
                    <h5 class="card-title">{decks.name}</h5>
                    <p class="card-text">{decks.description}</p>
                    <Link to={`/decks/${deckId}`}><button className="btn btn-primary bi bi-eye text-left">View</button></Link>
                    <Link to={`/decks/${deckId}/study`}><button className="btn btn-primary bi bi-book text-left">Study</button></Link>
                    <button 
                    className='btn btn-danger bi bi-trash3-fill text-right'
                    onClick={handleDelete}> {/* is this right or () => deleteDeck(deckId)*/}
                    </button>
                </div>
            </div>
        })
    }

    return (
        {displayDecks} // is this right 
    )
}

export default DeckList;