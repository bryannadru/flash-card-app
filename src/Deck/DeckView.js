import React, { useState, useEffect } from "react";
import {
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";
import DeckList from "./DeckList";

// this is parent component
function DeckView() {
  const { deckId } = useParams();
  const history = useHistory();

  // sets the deck useState --> parent state
  const [decks, setDecks] = useState([]);
  //const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        //console.log('hello')
        const decksFromAPI = await listDecks(deckId, abortController.signal);
        setDecks(decksFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deckId);
        } else {
          console.log(error);
          throw error;
        }
      }
    }
    loadDecks();

    return () => abortController.abort();
  }, []);

  // delete a deck
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Do you really want to delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(id);
      setDecks(currentDecks =>
        // setDecks(decks => decks.filter(deck => deck.id !== id));
        currentDecks.filter(deck => deck.id !== id)); 
      // creates a new array with all decks that do not match id
      // updates the state to not include deleted deck id
      history.push("/");
    }
  };

  const handleClick = () => {
    history.push("/decks/new");
  };

  return (
    <div>
      <Route exact path="/">
        <div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-secondary float-left m-2">
                + Create Deck
              </button>
            </div>
          </div>
        </div>
        <DeckList 
          decks={decks}  
          setDecks={setDecks} 
          onDelete={handleDelete} 
        />
      </Route>
    </div>
  );
}

export default DeckView;
