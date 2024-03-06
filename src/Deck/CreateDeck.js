import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams
} from "react-router-dom";
import { createDeck } from "../utils/api/index";
import CreateDeckForm from "../Forms/CreateDeckForm";

// REVIEWED -- need to figure out is it is decks.name or newDeck.name
function CreateDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialFormState);

  // handling the submission of the new deck
  async function handleSubmit(event) {
    event.preventDefault();
    setNewDeck({...newDeck, deckId: deckId})
    createDeck(deckId, newDeck)
    history.push(`/decks/${deckId}`)
    /*try {
      const response = await createDeck({
        name: newDeck.name, // decks.name ??
        description: newDeck.description, // decks.description ??
      });
      // created deck = the response
      const createdDeck = response;
      history.push(`/decks/${createdDeck.id}`);
    } catch (error) {
      console.error(error);
    } */
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewDeck((prevDeck) => ({
      ...prevDeck,
      [name] : value
    }))
  }

  // handles the cancel button & brings user to home page
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/decks/new">
          <CreateDeckForm
            newDeck={newDeck}
            deckId={deckId}
            setNewDeck={setNewDeck}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            handleChange={handleChange}
        />
            <button
              onClick={handleCancel}
              type="button"
              class="btn btn-secondary m-1">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              class="btn btn-primary">
              Submit
            </button>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default CreateDeck;
