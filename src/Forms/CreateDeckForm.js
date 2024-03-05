import React from "react";
import CreateDeck from "../Deck/CreateDeck";

function CreateDeckForm({ newDeck, setNewDeck }) {

  const handleChange = (target) => {
    setNewDeck((prevDeck) => ({
      ...prevDeck,
      [target.name]: target.value
    }))
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div>
        <h3>Create Deck</h3>
      </div>
      <form onChange={handleChange}>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Deck Name"
            value={newDeck.value}
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            placeholder="Brief description of deck"
            required
          />
        </div>
      </form>
    </div>
  );
}

export default CreateDeckForm;
