import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [existingDeck, setExistingDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setExistingDeck(deckFromAPI);
    }
  }, [deckId]);

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // updates existingDeck state
  const handleChange = (target) => {
    setExistingDeck({
      ...existingDeck,
      [target.name]: target.value 
      // the name and the value that is targeted during the change 
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deckId, existingDeck); // deckId identifies deck that is updated
    // existing deck is updated deck info 
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href='/decks/:deckId'>fix </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <div>
        <h1>Edit Deck</h1>
      </div>
      <form>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
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
        className="btn btn-secondary m-1">
        Cancel
      </button>
      <button onSubmit={handleSubmit} type="submit" class="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default EditDeck;
