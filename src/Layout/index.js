import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckView from "../Deck/DeckView";
import CreateDeck from "../Deck/CreateDeck";
import DeckStudy from "../Deck/DeckStudy";
import EditDeck from "../Deck/EditDeck";
import Deck from "../Cards/Deck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
          <Switch>
            <Route exact path="/">
              <DeckView />
            </Route>
            <Route exact path="/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <DeckStudy />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route exact path="/decks/:deckId">
              <Deck />
            </Route>
            <Route exact path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
      </div>
    </div>
  );
}

export default Layout;