import React, { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import DeckView from "../Deck/DeckView";
import EditCardForm from "../Forms/EditCardForm";
//import DeckStudy from './Deck/DeckStudy'
//import AddCard from './AddCard'

// REVIEWED AND REVISED -- JUST NEED TO CONFIRM

function EditCard() {

  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [existingCard, setExistingCard] = useState({ front: '', back: '' });
  
  useEffect(() => {
    const abortController = new AbortController()
    async function loadDecksAndCards() {
      try {
        const decksFromAPI = await readDeck(deckId, abortController.signal);
        setDecks(decksFromAPI);

        const cardsFromAPI = await readCard(cardId, abortController.signal);
        setExistingCard(cardsFromAPI);
      } catch (error) {
        console.error('Something went wrong', error)
        //console.error(`Read deck had an error(${deckId}).`, error);
      }
    }
    loadDecksAndCards();

    return () => abortController.abort()
  }, [deckId, cardId]);
  
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    setExistingCard({
      ...existingCard, // creates a new object with current properties of existingCard
      [name] : value // used to update the property corresponding with 'name'
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...existingCard }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  };
      /*try {
      await updateCard(cardId, existingCard);
      history.push(`/decks/${deckId}`);
    } catch(error) {
      console.log('There was an error editing the card : ', error)
    }*/

  return (
    <div>
      <EditCardForm
        existingCard={existingCard}
        setExistingCard={setExistingCard}
        decks={decks}
        setDecks={setDecks}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleChange={handleChange}
      />
    </div>
  );
}

export default EditCard;
