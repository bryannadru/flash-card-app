import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DeckStudy from "../Deck/DeckStudy";

function RestartDeck() {
  const [isFinished, setIsFinished] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [decks, setDecks] = useState({ cards: [] })

  const history = useHistory();

  /*const finishTask = () => {
    setIsFinished(true);
  }; */

  // go over this
  const restartTask = () => {
    if (currentCardIndex >= decks.cards.length - 1) {
      if (window.confirm("Restart Cards? Click cancel to return to the home page.")) {
        setCurrentCardIndex(0)
      } else {
        history.push('/')
      }
    } else {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      {isFinished ? (
        <button onClick={restartTask}>OK</button>
      ) : (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}

export default RestartDeck;
