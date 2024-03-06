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
    async function loadDecksAndCards() {
      try {
        console.log(deckId)
        const decksFromAPI = await readDeck(deckId);
        setDecks(decksFromAPI);

        const cardsFromAPI = await readCard(cardId);
        setExistingCard(cardsFromAPI);
      } catch (error) {
        console.error(`Read deck had an error(${deckId}).`, error);
      }
    }
    loadDecksAndCards();
  }, [cardId, deckId]);

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
    try {
      await updateCard(existingCard);
      console.log(existingCard)
      history.push(`/decks/${deckId}`);
    } catch(error) {
      console.log('There was an error editing the card : ', error)
    }
  };

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
