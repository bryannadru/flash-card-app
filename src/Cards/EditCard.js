import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

function EditCard() {

  const history = useHistory();
  const { cardId, deckId } = useParams();

  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };

  const initialCardState = {
    id: "",
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState(initialDeckState);
  const [card, setCard] = useState(initialCardState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        const cardResponse = await readCard(cardId, abortController.signal);
        setDeck(deckResponse);
        setCard(cardResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => abortController.abort();
    }
    fetchData();
  }, []);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <div>
        <h2>Edit Card</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            name="front"
            id="front"
            onChange={handleChange}
            value={card.front}
          />
        </div>
        <div className="form-group">
          <label for="back">Back</label>
          <textarea
            type="text"
            className="form-control"
            name="back"
            id="back"
            onChange={handleChange}
            value={card.back}
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              onClick={() => history.push(`/decks/${deckId}`)}
              className="btn btn-secondary">
              Cancel
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCard;

