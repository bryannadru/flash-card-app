import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api/index";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
// need to add Routes in all files !!!!
// first page listing all decks --> home page
// this file needs to show a list of Decks !!!

// this is parent component
function DeckView() {
  const { deckId } = useParams();
  const history = useHistory();

  // sets the deck useState --> parent state
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      try {
        const decksFromAPI = await readDeck();
        //console.log(decksFromAPI)
        setDecks(decksFromAPI);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    }
    loadDecks();
  }, []);

  // delete a deck
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Do you really want to delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(id);

      setDecks((updatedDeck) =>
        // setDecks(decks => decks.filter(deck => deck.id !== id));
        updatedDeck.filter((deck) => deck.id !== id)
      ); // creates a new array with all decks that do not match id
      // updates the state to not include deleted deck id
      history.push("/");
    }
  };

  const handleClick = () => {
    history.push('/decks/new')
  }

  return (
      <div>
            <button 
              type="button" 
              onClick={handleClick}
              className="btn btn-secondary text-left">
              + Create Deck
            </button>
          <Route exact path="/">
            <DeckList decks={decks} onDelete={handleDelete} />
          </Route>
      </div>
  );
}

export default DeckView;
