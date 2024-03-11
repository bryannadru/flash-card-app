import React, { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteCard } from "../utils/api";
import Deck from "./Deck";

function CardList({ cards, setCards }) {

  const history = useHistory();
  const { deckId } = useParams()

  const handleDelete = async (id) => {
    const confirmMessage = window.confirm(
      "Do you really want to delete this card? You will not be able to recover it."
    );

    if (confirmMessage) {
      deleteCard(id)
      .then(history.push(`/decks/${deckId}`))
      .then(window.location.reload());
    }
  };

  if (Array.isArray(cards)) {
    return (
      <div>
        {cards.map((card) => (
          <div className="card w-75" key={card.id}>
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="card-text">{card.front}</p>
                    </div>
                    <div className="col">
                      <p className="card-text">{card.back}</p>
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
}

export default CardList;
