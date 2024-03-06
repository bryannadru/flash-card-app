import React, { useState, useEffect } from "react";
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
        setDecks(decksFromAPI);

        const cardsFromAPI = await readCard(cardId, abortController.signal);
        setExistingCard(cardsFromAPI);
      } catch (error) {
        console.error('Something went wrong', error)
        //console.error(`Read deck had an error(${deckId}).`, error);
      }
    }
    loadDecksAndCards();

    return () => abortController.abort()
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

export default EditCard;
