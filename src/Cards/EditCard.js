import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { readDeck, readCard, updateCard } from '../utils/api/index'
import Study from './Study'
import AddCard from './AddCard'
import EditCardForm from '../Forms/EditCardForm'

function EditCard({ decks, setDeck, card, setFlashCards }) {


    /* done : 
        - route paths 
        - use readDeck() function with useEffect() 
        - need to laod the deck that contains card need to edi t
        - use readCard() function to read card want to edit 
            - if clicks submit or cancel, user goes to home screen 
        - breadcrumb in form file 
    */

    /* still need to figure out  : 
    - edit and update card 
    
    */


    const history = useHistory() 
    const { cardId, deckId } = useParams()
    // const [formData, setFormData] = useState(initialFormState) do i need this 

    useEffect(() => {
        async function loadDecksAndCards() {
            try {
                const decksFromAPI = await readDeck()
                setDeck(decksFromAPI)

                const cardsFromAPI = await readCard()
                setFlashCards(cardsFromAPI)
            } catch (error) {
                throw new Error(`Read deck had an error(${deckId}).`)
                // do i need this 
            }
        }
        loadDecksAndCards()
    }, [deckId, cardId])

    // ask about this in chat tomorrow 
    const handleChange = ({target}) => {
        setFlashCards({
            ...card,
            [target.name]: [target.value]
        })
    }

    // ask about this in chat tomorrow 
    async function handleSubmit(event) {
        event.preventDefault() 
        const newCard = {
            ...card,
            front: card.front,
            back: card.back
        }
        await updateCard(newCard) // updateCard is from index.js 
        history.push(`/decks/${deckId}`)
    }

    const handleCancel = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path={`/decks/${deckId}/cards/new`}></Route>
                </Switch>
            </Router>
            <EditCardForm /> {/* do i need to add anything else to this */}
        </div>
    )
}

export default EditCard;