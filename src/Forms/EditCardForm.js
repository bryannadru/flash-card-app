import React from "react";
import { useParams, useHistory } from "react-router-dom"
import EditCard from "../Cards/EditCard"
import DeckView from "../Deck/DeckView";

// REVIEWED --> GO OVER HANDLESUBMIT & HANDLECANCEL
function EditCardForm({
  card,
  handleChange,
  handleSubmit,
  handleCancel
}) {

  const history = useHistory()

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            name="front"
            id="front"
            handleChange={handleChange}
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
            handleChange={handleChange}            
            value={card.back}
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary">
              Cancel
            </button>
          </div>
          <button 
          type="submit" 
          className="btn btn-primary">
            Submit
          </button>
          </div>
      </form>
    </div>
  );
}

export default EditCardForm;
