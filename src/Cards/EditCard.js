import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { readDeck, readCard, updateCard } from '../utils/api/index'
import DeckView from '../Deck/DeckView'
import EditCardForm from '../Forms/EditCardForm'
//import DeckStudy from './Deck/DeckStudy'
//import AddCard from './AddCard'


// REVIEWED AND REVISED -- JUST NEED TO CONFIRM 

function EditCard({ decks, setDecks, cards, setCards }) {

    const history = useHistory() 
    const { cardId, deckId } = useParams()
    // const [formData, setFormData] = useState(initialFormState) do i need this 

    useEffect(() => {
        async function loadDecksAndCards() {
            try {
                const decksFromAPI = await readDeck(deckId)
                setDecks(decksFromAPI)

                const cardsFromAPI = await readCard(cardId)
                setCards(cardsFromAPI)
            } catch (error) {
                throw new Error(`Read deck had an error(${deckId}).`)
            }
        }
        loadDecksAndCards()
    }, [deckId, cardId])

    return (
        <div>
            <p>hi</p>
        </div>
    )
}

export default EditCard;