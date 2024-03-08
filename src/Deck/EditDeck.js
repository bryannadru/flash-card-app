import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const [existingDeck, setExistingDeck] = useState(initialDeckState);

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      try {
        const deckFromAPI = await readDeck(deckId, abortController.signal);
        setExistingDeck(deckFromAPI);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => abortController.abort();
    }
    loadDeck();
  }, []);

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // updates existingDeck state
  const handleChange = ({ target }) => {
    setExistingDeck({
      ...existingDeck,
      [target.name]: target.value,
      // the name and the value that is targeted during the change
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...existingDeck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{existingDeck.name} </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <div>
        <h1>Edit Deck</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder={existingDeck.name}
            value={existingDeck.name}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="back"
            name="description"
            placeholder={existingDeck.description}
            value={existingDeck.description}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleCancel}
          type="button"
          className="btn btn-secondary m-1">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
