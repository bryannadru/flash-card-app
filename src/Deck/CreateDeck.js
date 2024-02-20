import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Decks from './Deck'
import { createDeck } from '../utils/api/index'
import Deck from './Deck'
import CreateDeckForm from '../Forms/CreateDeckForm'


// review this 
function CreateDeck() {

    const [newDeck, setNewDeck] = useState(initialFormState)

    const initialFormState = {
        name: '',
        description: ''
    }

    // handling the submission of the new deck
    async function handleSubmit(event) {
        event.preventDefault()
        // awaits the response from the createDeck function 
        const response = await createDeck({
            name: newDeck.name,
            description: newDeck.description
        })
        // created deck = the response 
        const createdDeck = await response
        history.push(`/decks/${createdDeck.id}`)
    }

    // handles the cancel button & brings user to home page 
    const handleCancel = () => {
        history.push('/')
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">              {/*  is this correct to link back to home */}
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
            <CreateDeckForm />
                <button onClick={handleCancel} type="button" class="btn btn-secondary">Cancel</button>
                <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
                <Router>
                    <Switch>
                        <Route exact path='/decks/new'>
                            <CreateDeck />
                        </Route>
                    </Switch>
                </Router>
        </div>
    )
}

export default CreateDeck;