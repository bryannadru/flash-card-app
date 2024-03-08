import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams,
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
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push(`/decks/${response.id}`);
    return response;
  }

  const handleChange = ({ target }) => {
    setNewDeck((prevDeck) => ({
      ...prevDeck,
      [target.name]: target.value,
    }));
  };

  // handles the cancel button & brings user to home page
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <CreateDeckForm
        newDeck={newDeck}
        deckId={deckId}
        setNewDeck={setNewDeck}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateDeck;
