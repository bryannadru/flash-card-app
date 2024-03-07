import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckView from "../Deck/DeckView";
import AddCard from "./AddCard";

function NotEnoughCards({ cards }) {
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
      <h1>{decks?.name}: Study</h1>
      <h3>Not enough cards.</h3>
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
