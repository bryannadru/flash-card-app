import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  Link,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import DeckView from "../Deck/DeckView";
import CardList from "./CardList";

// this is a desk view showing all CARDS in a deck
function Deck() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [decks, setDecks] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    async function loadDecks() {
      try {
        const decksFromAPI = await readDeck(deckId, abortController.signal);
        setDecks(decksFromAPI);
        setCards(decksFromAPI.cards)
      } catch (error) {
        console.log('Something went wrong', error)
      }
    }
    loadDecks();

    return () => abortController.abort()
  }, []);

  // delete a deck 
  const handleDelete = async(id) => {
    if (
      window.confirm(
        "Do you really want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      setDecks(currentDecks =>
        currentDecks.filter(deck => deck.id !== id)); 
      history.push("/");
    }
  };

  // list all cards :
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {decks.name}
          </li>
        </ol>
      </nav>
      <h3>{decks.name}</h3>
      <p>{decks.description}</p>
      <div>
        <div className='row'>
      <Link to={`/decks/${deckId}/edit`}>
        <button className="btn btn-secondary m-1">Edit</button>
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button className="btn btn-primary m-1">Study</button>
      </Link>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary m-1">Add Cards</button>
      </Link>
      <Link to={'/'}>
      <button
        type="button"
        onClick={() => handleDelete(decks.id)}
        className="btn btn-danger m-1 float-right">
          Delete
        </button>
        </Link>
        </div>
      </div>
      <div>
        <div className='row'>
        <h2 className='p-2'>Cards</h2>
        </div>
      </div>
      <div>
        <CardList 
        cards={cards}  
        setCards={setCards}  
        onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Deck;
