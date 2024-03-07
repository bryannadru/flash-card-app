import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
//import EditCardForm from '../Forms/EditCardForm'

function EditCard() {

  const history = useHistory();
  const { cardId, deckId } = useParams();
  
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };

  const initialCardState = {
    id: "",
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState(initialDeckState);
  const [card, setCard] = useState(initialCardState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        const cardResponse = await readCard(cardId, abortController.signal);
        setDeck(deckResponse);
        setCard(cardResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => abortController.abort();
    }
    fetchData();
  }, []);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <div>
        <h2>Edit Card</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            name="front"
            id="front"
            handleChange={handleChange}
            value={card.front}
          />
        </div>
        <div className="form-group">
          <label for="back">Back</label>
          <textarea
            type="text"
            className="form-control"
            name="back"
            id="back"
            handleChange={handleChange}
            value={card.back}
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              onClick={() => history.push(`/decks/${deckId}`)}
              className="btn btn-secondary">
              Cancel
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCard;

/*import React, { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import DeckView from "../Deck/DeckView";
import EditCardForm from "../Forms/EditCardForm";
//import DeckStudy from './Deck/DeckStudy'
//import AddCard from './AddCard'

// REVIEWED AND REVISED -- JUST NEED TO CONFIRM

function EditCard() {
  
  const initialCardState = {
    id: "",
    front: "",
    back: "",
  };
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [existingCard, setExistingCard] = useState(initialCardState);
  
  useEffect(() => {
    const abortController = new AbortController()
    async function loadDecksAndCards() {
      try {
        const decksFromAPI = await readDeck(deckId, abortController.signal);
        const cardsFromAPI = await readCard(cardId, abortController.signal);
        setDecks(decksFromAPI);
        setExistingCard(cardsFromAPI);
      } catch (error) {
        //console.error('Something went wrong', error)
        console.error(`Read deck had an error(${deckId}).`, error);
      }
    }
    loadDecksAndCards();
  }, []);
  useEffect(() => {
    readDeck(deckId).then(setDecks);
    readCard(cardId).then(setExistingCard);
}, [deckId, cardId]); 


  
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  function handleChange({ target }) {
    setExistingCard({
      ...existingCard,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...existingCard }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
            <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">FIX</li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card: {cardId}
          </li>
        </ol>
      </nav>
      <div>
        <h2>Edit Card</h2>
      </div>
      <EditCardForm
        existingCard={existingCard}
        setExistingCard={setExistingCard}
        decks={decks}
        setDecks={setDecks}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleChange={handleChange}
      />
    </div>
  );
}

export default EditCard; */
