import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { readDeck } from "../utils/api";
import AddCard from "../Cards/AddCard";
import DeckView from "../Deck/DeckView";

function AddCardForm({ newCard, handleChange, handleSave }) {
  const { deckId } = useParams();
  // const [hasEnoughCards, setHasEnoughCards] = useState(true)
  const [ decks, setDecks] = useState([])
  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDecks(deckFromAPI);
    }

    loadDeck()
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item">{decks?.name}</li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h2>{decks?.name} : Add Card</h2>
      <form onSubmit={handleSave}>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label for="front">Front</label>
              <textarea
                id="front"
                type="front"
                name="front"
                className="form-control"
                placeholder="Front side of card"
                value={newCard.front}
                onChange={handleChange}>
              </textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label for="back">Back</label>
              <textarea
                id="back"
                type="back"
                name="back"
                className="form-control"
                placeholder="Back side of card"
                value={newCard.back}
                onChange={handleChange}>
              </textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


export default AddCardForm;
