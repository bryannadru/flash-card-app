import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Deck from '../Deck/Deck'

// how to connect card 
function NotEnoughCards({ cards, setFlashCards }) {

    const [cardLength, enoughCards] = useState(true)

    // which do i need 
    const notEnoughCards = () => {
        if (cardLength.length < 2) {
            enoughCards(false)
        }
    }

    const addCards = () => {
        setFlashCards(cards + 1)
    }

    if (cards.length <= 2) {
        return (
        <div>
            <h1>{setFlashCards.name}: Study</h1>
            <h2>Not enough cards</h2>
            <p>You need at least 3 cards to study. There are {cardLength.length} in this deck.</p>
            {/* dynamic route ??  */}
            <Link to={`/decks/:deckId/cards/new`}> {/* check that this route is correct */}
              <button onClick={addCards}>
                + Add Cards
              </button>
            </Link>
            {/* is this right */}
        </div>
        // <NotEnoughCards= {?} />
      )
    }

    /* if (cards.length <= 2) {
        return (
          <div>
            <p>Not enough cards.</p>
            <button onClick={addCards}>
              Add Cards
            </button>
          </div>
        );
      } */

}

export default NotEnoughCards;