import React from "react";
import AddCard from "../Cards/AddCard";
import DeckView from "../Deck/DeckView";

/* still unsure : 
    - figure out how to reference deck name
*/

/* done : 
    - breadcrumb bar  
    - heading 
*/

function AddCardForm({ newCard, setNewCard, decks, handleChange }) {

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol clasName="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">{decks.name}</a>
          </li>{" "}
          {/*figure out how to get deck name */}
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{decks.name}: Add Card</h2>
      <form>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label for="front">Front</label>
              <textarea
                id="front"
                type="front"
                name="front"
                class="form-control"
                placeholder="Front side of card"
                value={newCard.front}
                onChange={handleChange}>
              </textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label for="back">Back</label>
              <textarea
                id="back"
                type="back"
                name="back"
                placeholder="Back side of card"
                value={newCard.back}
                onChange={handleChange}>
              </textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


export default AddCardForm;
