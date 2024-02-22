import React from 'react'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { createDeck } from '../utils/api/index'
import Deck from './Deck'
import CreateDeckForm from '../Forms/CreateDeckForm'


// REVIEWED -- need to figure out is it is decks.name or newDeck.name 
function CreateDeck() {

    const { deckId } = useParams()

    const initialFormState = {
        name: '',
        description: ''
    }
    
    const [newDeck, setNewDeck] = useState(initialFormState)

    // handling the submission of the new deck
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await createDeck({
                name: newDeck.name, // decks.name ??
                description: newDeck.description // decks.description ??
            })
            // created deck = the response 
            const createdDeck = response
            history.push(`/decks/${deckId}`)
        } catch(error) {
            console.error(error)
        }
    }

    // handles the cancel button & brings user to home page 
    const handleCancel = () => {
        history.push('/')
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/decks/new'>
                        <CreateDeck />
                    </Route>
                </Switch>
            </Router>
            <CreateDeckForm />
            <button onClick={handleCancel} type="button" class="btn btn-secondary">Cancel</button>
            <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
        </div>
    )
}

export default CreateDeck;