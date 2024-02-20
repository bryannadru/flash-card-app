import React, { useState } from 'react'
import { useHistory, useParams, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import { readDeck, createCard } from '../utils/api/index'
import DeckView from '../Deck/DeckView'


function AddCard({ card, setCards, decks, setDeck }) {
    /* still unsure : 
    - map over decks to form deckList ?
    - save handler  --> need to go over function 
    - do i need to use createCard api??
    */

    /*
    done --> 
    - form 
    - useEffect 
    - breadcrumb
        - done handler 
     - useEffect to load all decks
     - route path  
    - use readDeck to load deck to add card 
    - import readDeck function  
    
    */


    // using flashcard state from parent --> cards, setFlashCard


    let history = useHistory() 
    const { deckId } = useParams()

    const initialFormState = {
        front: '',
        back: ''
    }

    const [card, setNewCard] = useState()

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck()
            setDeck(deckFromAPI)
        }
        loadDeck()
    }, [deckId])

    // handle save button 
    // review the addNewCard function 
    async function handleSave(event) {
        event.preventDefault() 
        const newCard = {
            ...card,
            front: cards.front,
            back: cards.back
        }
        await createCard(newCard)
        setNewCard(initialFormState)
    }

    // handle done button 
    const handleDone = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
        <Router>
            <Switch>
                <Route exact path={`/decks/:deckId/cards/new`}></Route> {/* does this need to be a dynamic route */}
            </Switch>
        </Router>
        <AddCardForm />
      </div>
    )
}

export default AddCard;