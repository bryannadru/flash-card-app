import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api/index'
import DeckView from './DeckView'

// REVIEWED AND REVISED 
function EditDeck() {

    // change state 
    const history = useHistory()
    const { deckId } = useParams()

    const [existingDeck, setExistingDeck] = useState(deckId)

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId)
            setExistingDeck(deckFromAPI)
        }
    }, [deckId])

    const handleCancel = () => {
        history.push(`deck/${deckId}`)
        // is dynamic route correct here 
    }

    // is this right 
    const handleChange = (event) => {
        event.preventDefault()
        setExistingDeck({
            ...existingDeck,
            name: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newDeck = ({ //newDeck ??
            ...existingDeck,
            name: existingDeck.name,
            description: existingDeck.description
        })
        updateDeck(deckId, newDeck)
        history.push(`/decks/${deckId}`)
    }

    // Route=/decks/:deckId/edit
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">{existingDeck.name}</a></li> {/* deckId.name ? */}
                    <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>           
            <h1>Edit Card</h1>
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder={deckId.name} // figure out how to reference the deck description 
                        value={existingDeck.name}
                        onChange={handleChange}
                    />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="back" 
                        name="description"
                        placeholder={deckId.description} // figure out how to reference the deck description
                        value={existingDeck.description}
                        onChange={handleChange}
                    />
                </div>
            </form>
                    <button onSubmit={handleCancel}type="button">Cancel</button>
                    <button onSubmit={handleSubmit} type="submit">Submit</button>
                    <Router>
                        <Switch>
                            <Route exact path={`decks/${deckId}/edit`} />
                        </Switch>
                    </Router>
        </div>
    )
}

export default EditDeck;
