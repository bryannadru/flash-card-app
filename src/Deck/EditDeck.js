import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  // change state
  const history = useHistory();
  const { deckId } = useParams();

  const [existingDeck, setExistingDeck] = useState({ name: '', description: '' });

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setExistingDeck(deckFromAPI);
    }
  }, [deckId]);

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // is this right
  const handleChange = (target) => {
    setExistingDeck({
      ...existingDeck,
      [target.name]: target.value 
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deckId, existingDeck);
    history.push(`/decks/${deckId}`);
  };

  // Route=/decks/:deckId/edit
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href='/decks/:deckId'>{existingDeck}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <div>
        <h1>Edit Deck</h1>
      </div>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Deck" // figure out how to reference the deck description
            value={existingDeck.name}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            type="text"
            class="form-control"
            id="back"
            name="description"
            placeholder="Description of Deck" // figure out how to reference the deck description
            value={existingDeck.description}
            onChange={handleChange}
          />
        </div>
      </form>
      <button
        onClick={handleCancel}
        type="button"
        class="btn btn-secondary m-1">
        Cancel
      </button>
      <button onSubmit={handleSubmit} type="submit" class="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default EditDeck;
