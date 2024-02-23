import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { readDeck, readCard, updateCard } from '../utils/api/index'
import { ErrorBoundary } from 'react-error-boundary'
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
                const decksFromAPI = await readDeck()
                setDecks(decksFromAPI)

                const cardsFromAPI = await readCard()
                setCards(cardsFromAPI)
            } catch (error) {
                throw new Error(`Read deck had an error(${deckId}).`)
            }
        }
        loadDecksAndCards()
    }, [deckId, cardId])

    // not 100% sure 
    const handleChange = ({ target }) => {
        setCards({
            ...cards,
            [target.name]: target.value
        })
    }

    // ask about this in chat tomorrow 
    async function handleSubmit(event) {
        event.preventDefault() 
        const newCard = {
            ...cards,
            front: cards.front,
            back: cards.back
        }
        await updateCard(cardId, newCard) // updateCard is from index.js 
        history.push(`/decks/${deckId}`)
    }

    const handleCancel = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
            <Router>
                <Switch>
                    {/*<Route path={`/decks/${deckId}/cards/new`} /> */}
                    <Route path={`/decks/${deckId}/cards/${cardId}/edit`}>
                        <EditCard />
                    </Route>
                </Switch>
            </Router>
            <EditCardForm />
            </ErrorBoundary>
        </div>
    )
}

export default EditCard;