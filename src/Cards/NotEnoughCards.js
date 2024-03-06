import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckView from "../Deck/DeckView";
import AddCard from "./AddCard";

// REVIEWED -- might need to ask questions
function NotEnoughCards({ cards, decks, setDecks }) {
  const { deckId } = useParams();
  // const [hasEnoughCards, setHasEnoughCards] = useState(true)

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDecks(deckFromAPI);
    }
  }, [deckId]);

  return (
    <div>
      <h1>: Study</h1>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cards.length} in this
        deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary float-left">+ Add Cards</button>
      </Link>
    </div>
  );
}
export default NotEnoughCards;
