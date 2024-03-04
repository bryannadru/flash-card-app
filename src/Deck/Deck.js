import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard, readCard } from "../utils/api/index";
import DeckView from "./DeckView";
import CardList from "../Cards/CardList";
//import DeckStudy from './DeckStudy'
//import DeckList from './DeckList'

// REVIEWED AND REVISED
// this is a desk view showing all CARDS in a deck
// this file displays all info about a deck -- basically all cards in deck
function Deck() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [decks, setDecks] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    async function loadDecks() {
      try {
        const decksFromAPI = await readDeck(deckId); // do we need readDeck or listDeck
        setDecks(decksFromAPI);

        const cardsFromAPI = await readCard(cardId)
        setCards(cardsFromAPI)
      } catch (error) {
        throw new Error(`Deck ${cardId} had an error: ${error}`);
      }
    }
    loadDecks();

    return () => abortController.abort()
  }, [cardId]);

  // delete a card  -- make sure this function is correct
  const handleDelete = async(id) => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      try {
        await deleteCard(id);
        setCards(currentCards => 
          currentCards.filter(card => card.id !== id))
      } catch (error) {
          console.error('Error deleting card', error)
      }
    }
  };

  // const list all cards :
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            React Router {/* fix this  */}
          </li>
        </ol>
      </nav>
      <h3>{decks.name}</h3> {/* deckId.name ?? */}
      <p>{decks.description}</p>
      <div>
        <div class='row'>
      <Link to={`/decks/${deckId}/edit`}>
        <button className="btn btn-secondary m-1">Edit</button>
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button className="btn btn-primary m-1">Study</button>
      </Link>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary m-1">Add Cards</button>
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className="btn btn-danger m-1 float-right">
          Delete
        </button>
        </div>
      </div>
      <div>
        <div class='row'>
        <h2 className='p-2'>Cards</h2>
        </div>
      </div>
      <div>
        <CardList cards={cards}  setCards={setCards}  onDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default Deck;
