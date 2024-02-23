import React, { useState, useEffect } from 'react'
import { useHistory, useParams, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { readDeck, createCard } from '../utils/api/index'
import { ErrorBoundary } from 'react-error-boundary'
import DeckView from '../Deck/DeckView'
import AddCardForm from '../Forms/AddCardForm'
    /* REVIEWED AND REVISED  */

    // using flashcard state from parent in DeckView --> cards, setFlashCard
function AddCard({ cards, setCards, decks, setDecks }) {

    let history = useHistory() 
    const { deckId } = useParams()

    const initialFormState = {
        front: '',
        back: '' // and back: '' ??
    }

    const [formData, setFormData] = useState(initialFormState)

    useEffect(() => {
        async function loadDeck() {
            try {
                const deckFromAPI = await readDeck(deckId)
                setDecks(deckFromAPI)
            } catch(error) {
                console.error('There was an error reading the deck: ', error)
            }
        }
        loadDeck()
    }, [deckId])

    async function handleSave(event) {
        event.preventDefault() 
        try {
            const newCard = {
                ...cards,
                front: cards.front,
                back: cards.back
            }
            await createCard(deckId, newCard)
            setCards(initialFormState)
        } catch(error) {
            console.error('Error saving card: ', error)
        }
    }

    const handleDone = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Router>
            <Switch>
                <Route exact path={`/decks/${deckId}/cards/new`}>
                    <AddCardForm />
                </Route>
            </Switch>
        </Router>
        <div>
            <div className='row'>
                <div className='col'>
                    <button onClick={handleDone} className='btn btn-secondary text-left'>Done</button>
                    <button onClick={handleSave} className='btn btn-primary text-left'>Save</button> {/* text right or float right ?  */}
                </div>
            </div>
        </div>
        </ErrorBoundary>
      </div>
    )
}

export default AddCard;