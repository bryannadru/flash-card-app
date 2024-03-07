import React from "react";
import { useParams } from "react-router-dom"
import EditCard from "../Cards/EditCard"
import DeckView from "../Deck/DeckView";

// REVIEWED --> GO OVER HANDLESUBMIT & HANDLECANCEL
function EditCardForm({
  card,
  handleChange,
  handleSubmit,
  handleCancel
}) {


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
            placeholder={card.front}
            value={card.front}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="back">Back</label>
          <textarea
            type="text"
            className="form-control"
            name="back"
            id="back"
            placeholder=""
            value={card.back}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              onClick={handleCancel}
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
