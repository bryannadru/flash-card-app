import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";
//import { ErrorBoundary } from 'react-error-boundary'
import DeckView from "../Deck/DeckView";

// REVIEWED AND REVISED
function CardList() {
  const history = useHistory();
  const [cards, setCards] = useState([]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Do you really want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteCard(id);

      setCards((updatedCard) =>
        // setDecks(decks => decks.filter(deck => deck.id !== id));
        updatedCard.filter((card) => card.id !== id)
      ); // creates a new array with all decks that do not match id
      // updates the state to not include deleted deck id
      history.push("/");
    }
  };
  if (Array.isArray(cards)) {
    return (
      <div>
        {cards.map((card) => (
          <div class="card w-75" key={card.id}>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">{card.front}</p>
              <button
                className="m-1 btn btn-danger float-right"
                onClick={() => handleDelete(card.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default CardList;
