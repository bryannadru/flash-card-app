import React from "react";
import CreateDeck from "../Deck/CreateDeck";

function CreateDeckForm({ newDeck, handleSubmit, handleChange, handleCancel }) {

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div>
        <h3>Create Deck</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            value={newDeck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Brief description of deck"
            value={newDeck.description}
            onChange={handleChange}>
          </textarea>
        </div>
        <button
              onClick={handleCancel}
              type="button"
              className="btn btn-secondary m-1">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary">
              Submit
            </button>
      </form>
    </div>
  );
}

export default CreateDeckForm;
