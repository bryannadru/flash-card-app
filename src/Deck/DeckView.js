import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";
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
    const abortController = new AbortController()
    async function loadDecks() {
      try {
        //console.log('hello')
        const decksFromAPI = await listDecks(deckId, abortController.signal );
        setDecks(decksFromAPI);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted', deckId)
        } else {
          console.log(error)
          throw error 
        }
      }
    }
    loadDecks();

    return () => abortController.abort()
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
          <Route exact path="/">
          <button 
              type="button" 
              onClick={handleClick}
              className="m-2 btn btn-secondary float-left">
              + Create Deck
            </button>
            <DeckList decks={decks} onDelete={handleDelete} />
          </Route>
      </div>
  );
}

export default DeckView;
