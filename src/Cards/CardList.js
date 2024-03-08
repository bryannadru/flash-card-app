import React, { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteCard } from "../utils/api";
import Deck from "./Deck";

function CardList({ cards, setCards }) {
  
  const history = useHistory();
  const { deckId, cardId } =useParams()
  const handleDelete = async (id) => {
    if (
      window.confirm("Do you really want to delete this deck? You will not be able to recover it.")) {
      try {
        await deleteCard(id)
        setCards((updatedCard) =>
          // setDecks(decks => decks.filter(deck => deck.id !== id));
          updatedCard.filter((card) => card.id !== id)
        ); // creates a new array with all decks that do not match id
        // updates the state to not include deleted deck id
        history.push("/");
      } catch (error) {
        console.log('something went wrong', error)
      }
    }
  };

  if (Array.isArray(cards)) {
    return (
      <div>
        {cards.map((card) => (
          <div class="card w-75" key={card.id}>
            <div class="card-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p class="card-text">{card.front}</p>
                    </div>
                    <div className="col">
                      <p class="card-text">{card.back}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  className="m-1 btn btn-danger float-right m-1"
                  onClick={() => handleDelete(card.id)}>
                  Delete
                </button>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                  <button className="btn btn-secondary float-right m-1">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default CardList;
