import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { deleteDeck } from "../utils/api/index";
import DeckView from './DeckView'

// REVIEWED AND REVISED 
function DeckList({ decks, setDecks }) { // figure out the handle delete btn 

    const history = useHistory()
    const handleDelete = (id) => {
        if (
          window.confirm(
            "Do you really want to delete this deck? You will not be able to recover it."
          )
        ) {
          deleteDeck(id);
    
          setDecks((updatedDeck) =>
            // setDecks(decks => decks.filter(deck => deck.id !== id));
            updatedDeck.filter((deck) => deck.id !== id)
          ); // creates a new array with all decks that do not match id
          // updates the state to not include deleted deck id
          history.push("/");
        }
      };
    
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