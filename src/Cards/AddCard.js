import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import AddCardForm from "../Forms/AddCardForm";
//import DeckView from "../Deck/DeckView";

function AddCard() {

  const initialFormState = {
    front: "",
    back: "", // and back: '' ??
  };
  let history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([])
  const [newCard, setNewCard] = useState(initialFormState);

  useEffect(() => {
    const abortController = new AbortController()
    async function loadDecks() {
      const decksFromAPI = await readDeck(deckId, abortController.signal)
      setDeck(decksFromAPI)
    }
    loadDecks()

    return () =>  abortController.abort()
}, [deckId])

  async function handleSave(event) {
    event.preventDefault();
    setNewCard({...newCard, deckId: deckId})
    createCard(deckId, newCard)
    setNewCard(initialFormState)
    history.push(`/decks/${deckId}`)
    console.log(newCard)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewCard(prev => ({...prev, [name]: value}))
  }

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <div>
      <AddCardForm 
        newCard={newCard} 
        deckId={deckId}
        setNewCard={setNewCard} 
        handleSave={handleSave}
        handleChange={handleChange}
      />
        <div className="row">
          <div className="col">
            <button
              onClick={handleDone}
              className="btn btn-secondary text-left m-1">
              Done
            </button>
            <button 
                onClick={handleSave}
                className="btn btn-primary text-left m-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;

    /* async function handleSave(event) {
      event.preventDefault();
      try {
        const response = await createCard({
          front: newCard.front,
          back: newCard.back,
        });
        const createdCard = response;
      } catch (error) {
        console.error("There was an error reading the deck: ", error);
      }
    } */

    /*try {
      const newCard = {
        front: newCard.front,
        back: newCard.back,
      };
      await createCard(deckId, newCard);
      setNewCard(initialFormState);
      history.push(`decks/${deckId}`)
    } catch (error) {
      console.error("Error saving card: ", error);
    } */