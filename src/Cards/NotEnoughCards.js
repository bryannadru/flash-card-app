import React from 'react'
import { useParams, Link } from 'react-router-dom'
import DeckView from '../Deck/DeckView'
import AddCard from './AddCard'

// REVIEWED -- might need to ask questions
function NotEnoughCards({ cards, setCards }) {

    const { cardId, deckId } = useParams()
    // const [hasEnoughCards, setHasEnoughCards] = useState(true)
 
    /* dont think i need this ??
    const notEnoughCards = () => {
        if (cards.length < 2) {
            setHasEnoughCards(false)
        }
    }
    const addCards = () => {
        setCards(prevFlashCards => prevFlashCards + 1)
    } */

    if (cards.length < 3) {
        return (
        <div>
            <h1>{cardId.name}: Study</h1> {/* is it cardId.name or cards.name ? */}
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button /*onClick={addCards} */>
                + Add Cards
              </button>
            </Link>
        </div>
      )
    }
}
export default NotEnoughCards;