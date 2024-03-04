import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { deleteDeck } from "../utils/api/index";
import DeckView from './DeckView'

// REVIEWED AND REVISED 
function DeckList({ decks, setDecks }) { // figure out the handle delete btn 

    const history = useHistory()
    const { deckId } = useParams()

    const handleDelete = async (id) => {
        if (
          window.confirm(
            "Do you really want to delete this deck? You will not be able to recover it."
          )
        ) {
          await deleteDeck(id);
    
          setDecks((updatedDeck) =>
            // setDecks(decks => decks.filter(deck => deck.id !== id));
            updatedDeck.filter((deck) => deck.id !== id)
          ); // creates a new array with all decks that do not match id
          // updates the state to not include deleted deck id
          history.push("/");
        }
      };
    
    if (Array.isArray(decks)) {
        return (
            <div>
            {decks.map((deck) => (
                <div class="card w-75" key={deck.id}>
                    <div class="card-body">
                        <h5 class="card-title">{deck.name}</h5>
                        <p class="card-text">{deck.description}</p>
                        <Link to={`/decks/${deck.id}`}>
                            <button className="m-1 btn btn-primary bi bi-eye text-left">
                                Study
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button className="m-1 btn btn-secondary bi bi-book float-left">
                                View
                            </button>
                        </Link>
                        <button 
                            className='m-1 btn btn-danger bi bi-trash3-fill float-right'
                            onClick={() => handleDelete(deck.id)}>
                                Delete
                        </button> 
                    </div>
                </div>
            ))}
        </div>
        )
    }
    return null;
}

export default DeckList;