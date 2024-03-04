import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  Link,
} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard, readCard } from "../utils/api/index";
import DeckView from "../Deck/DeckView";
import CardList from "./CardList";
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
        const decksFromAPI = await readDeck(deckId, abortController.signal); // do we need readDeck or listDeck
        setDecks(decksFromAPI);
        //const cardsFromAPI = await readCard(cardId)
        //setCards(cardsFromAPI)
      } catch (error) {
        if (error.name === 'Aborted') {
          console.log('Aborted', deckId)
        } else {
          console.log(error)
          throw error 
        }
      }
    }
    loadDecks();

    return () => abortController.abort()
  }, []);

  // delete a deck 
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Do you really want to delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(id);
      setDecks(currentDecks =>
        // setDecks(decks => decks.filter(deck => deck.id !== id));
        currentDecks.filter(deck => deck.id !== id)); 
      // creates a new array with all decks that do not match id
      // updates the state to not include deleted deck id
      history.push("/");
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
            {decks.name} {/* fix this  */}
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
