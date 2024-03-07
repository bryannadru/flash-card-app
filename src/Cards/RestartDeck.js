import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckStudy from "../Deck/DeckStudy";

function RestartDeck({ cards, cardIndex, setCardIndex }) {

  const history = useHistory();
  const { deckId } = useParams();
  const [ decks, setDecks] = useState([])

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDecks(deckFromAPI);
    }

    loadDeck()
  }, [deckId]);

  const restartDeck = () => {
    if (cardIndex === cards.length) {
      if (window.confirm('You have reached the end of this deck. Click Restart to study again or cancel to return home.')) {
        setCardIndex(0)
      }
    }
  }



  /*const confirmRestart = () => {
    // This function only confirms restart or navigates home.
    if (window.confirm("Restart Cards? Click cancel to return to the home page.")) {
      setCardIndex(0); // This should reset the state in the parent component.
    } else {
      history.push("/"); // Navigate home if they choose not to restart.
    }
  }; */

  return (
    <div>
      <h3>You have reached the end of the deck. Click Restart to the deck or click cancel to return home.</h3>
      <button type="button" onClick={restartDeck}>
        Restart
      </button>
    </div>
  );
}

export default RestartDeck;
