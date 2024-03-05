import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { updateCard } from '../utils/api'
import DeckView from '../Deck/DeckView'

// REVIEWED --> GO OVER HANDLESUBMIT & HANDLECANCEL
function EditCardForm({ existingCard, handleCancel, handleChange, handleSubmit }) {

    const history = useHistory() 

    return (
        <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"> 
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item">FIX</li> 
                <li class="breadcrumb-item active" aria-current="page">Edit Card: fix</li>
            </ol>
        </nav>
        <div>
            <h2>Edit Card</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                    <label for="front">Front</label>
                    <textarea 
                        type="text" 
                        class="form-control" 
                        name="front"
                        id="front" 
                        placeholder=''
                        value={existingCard.front}
                        onChange={handleChange}
                    />
            </div>
                <div class="form-group">
                    <label for="back">Back</label>
                    <textarea 
                        type="text" 
                        class="form-control" 
                        name="back"
                        id="back" 
                        placeholder='' 
                        value={existingCard.back}
                        onChange={handleChange}
                    />
            </div>
        </form>
    </div>
    )
}

export default EditCardForm;