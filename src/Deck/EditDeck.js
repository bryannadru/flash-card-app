import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api/index'


function EditDeck() {

    const history = useHistory()
    const { deckId } = useParams()

    const [existingDeck, setExistingDeck] = useState('')

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
        // setExistingDeck(event.target.value)
        event.preventDefault()
        setExistingDeck({
            ...existingDeck,
            [target.id]: target.value
        })
    }



    // Route=/decks/:deckId/edit
    return (
        <div>
                    <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">{deck.name}</a></li> {/* edit this deck.name */}
                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                    </nav>           
                    <h1>Edit Card</h1>
                    <form>
                        <div class="form-group">
                            <label for="front">Front</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="formGroupExampleInput" 
                                placeholder={deck.description} // figure out how to reference the deck description 
                                value={existingDeck}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label for="back">Back</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="formGroupExampleInput2" 
                                placeholder={deck.description} // figure out how to reference the deck description
                                value={existingDeck}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                    <button onSubmit={handleCancel}type="button">Cancel</button>
                    <button onSubmit={handleChange} type="submit">Submit</button>
                    <Router>
                        <Switch>
                            <Route exact path={`decks/${deckId}/edit`} />
                        </Switch>
                    </Router>
        </div>
    )
}

export default EditDeck;
