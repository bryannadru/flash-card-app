import React, { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
  Link,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import DeckView from "../Deck/DeckView";
import EditCardForm from "../Forms/EditCardForm";
//import DeckStudy from './Deck/DeckStudy'
//import AddCard from './AddCard'

// REVIEWED AND REVISED -- JUST NEED TO CONFIRM

function EditCard() {
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [decks, setDecks] = useState(deckId);
  const [existingCard, setExistingCard] = useState({ front: '', back: '' });

  useEffect(() => {
    async function loadDecksAndCards() {
      try {
        const decksFromAPI = await readDeck(deckId);
        setDecks(decksFromAPI);

        const cardsFromAPI = readCard(cardId);
        setExistingCard(cardsFromAPI);
      } catch (error) {
        throw new Error(`Read deck had an error(${deckId}).`);
      }
    }
    loadDecksAndCards();
  }, [cardId]);

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleChange = (event) => {
    setExistingCard({
      ...existingCard,
      name: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(cardId, existingCard);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <EditCardForm
        existingCard={existingCard}
        setExistingCard={setExistingCard}
        decks={decks}
        setDecks={setDecks}
      />
      <div>
        <div className="row">
          <div className="col">
            <button
              onClick={handleCancel}
              className="btn btn-secondary text-left">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn btn-primary text-left m-1">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
