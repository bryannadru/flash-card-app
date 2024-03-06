import React from "react";
import EditCard from "../Cards/EditCard"
import DeckView from "../Deck/DeckView";

// REVIEWED --> GO OVER HANDLESUBMIT & HANDLECANCEL
function EditCardForm({
  existingCard,
  handleChange,
  handleSubmit,
  handleCancel,
}) {

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">FIX</li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card: 
          </li>
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
            placeholder={existingCard.front}
            value={existingCard.front}
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
            value={existingCard.back}
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
