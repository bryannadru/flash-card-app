import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckView from "../Deck/DeckView";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <DeckView />
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
