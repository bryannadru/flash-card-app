import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import { ErrorBoundary } from "react-error-boundary";
import DeckView from "../Deck/DeckView";
import AddCardForm from "../Forms/AddCardForm";
/* REVIEWED AND REVISED  */

// using flashcard state from parent in DeckView --> cards, setFlashCard
function AddCard() {
  const initialFormState = {
    front: "",
    back: "", // and back: '' ??
  };

  let history = useHistory();
  const { deckId, cardId } = useParams();
  const [newCard, setNewCard] = useState(initialFormState);

    async function handleSave(event) {
      event.preventDefault();
      try {
        const response = await createCard({
          front: newCard.front,
          back: newCard.back,
        });
        const createdCard = response;
      } catch (error) {
        console.error("There was an error reading the deck: ", error);
      }
    }

  /*async function handleSave(event) {
    event.preventDefault();
    try {
      const newCard = {
        ...cards,
        front: cards.front,
        back: cards.back,
      };
      await createCard(deckId, newCard);
      setCards(initialFormState);
    } catch (error) {
      console.error("Error saving card: ", error);
    }
  } */

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col">
            <button
              onClick={handleDone}
              className="btn btn-secondary text-left">
              Done
            </button>
            <button 
                onClick={handleSave}
                className="btn btn-primary text-left">
              Save
            </button>
          </div>
        </div>
      </div>
      <AddCardForm 
        newCard={newCard} 
        setNewCard={setNewCard} 
    />
    </div>
  );
}

export default AddCard;
