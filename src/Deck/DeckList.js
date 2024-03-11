import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";
import DeckView from "./DeckView";

function DeckList({ decks, setDecks }) {
  // figure out the handle delete btn

  const history = useHistory();

  /* const handleDelete = async (id) => {
      const confirmMessage = window.confirm("Do you really want to delete this deck? You will not be able to recover it.")
      if (confirmMessage) {
        await deleteDeck(id)
        setDecks((updatedDeck) =>
          updatedDeck.filter((deck) => deck.id !== id)
        ); // creates a new array with all decks that do not match id
        // updates the state to not include deleted deck id
        history.push('/');
      }
      .then((history.push('/')))
      .then(window.location.reload())
  }; */

  const handleDelete = async (id) => {
    const confirmMessage = window.confirm(
      "Do you really want to delete this deck? You will not be able to recover it."
    );

    if (confirmMessage) {
      deleteDeck(id).then(history.push(`/`)).then(window.location.reload());
    }
  };

  if (Array.isArray(decks)) {
    return (
      <div>
        {decks.map((deck) => (
          <div className="card w-75" key={deck.id}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">{deck.name}</h5>
                </div>
                <div>
                  <p className="float-right p-1"> {deck.cards?.length} cards</p>
                </div>
              </div>
              <p className="card-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}`}>
                <button className="m-1 btn btn-primary bi bi-eye text-left">
                  Study
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button className="m-1 btn btn-secondary bi bi-book float-left">
                  View
                </button>
              </Link>
              <button
                className="m-1 btn btn-danger float-right"
                onClick={() => handleDelete(deck.id)}>
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

export default DeckList;
