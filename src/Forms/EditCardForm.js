import React from 'react'
import { useParams } from 'react-router-dom'
import EditCard from '../Cards/EditCard'

// REVIEWED --> GO OVER HANDLESUBMIT & HANDLECANCEL
function EditCardForm({ decks, cards }) {

    const { cardId } = useParams // is this right 

    return (
        <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"> {/* is home right */}
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item">{decks.name}</li> {/*figure out how to get deck name */}
                <li class="breadcrumb-item active" aria-current="page">Edit Card: {cardId}</li>
            </ol>
        </nav>
        <div>
            <h2>Edit Card</h2>
        </div>
        <form>
            <div class="form-group">
                    <label for="front">Front</label>
                    <textarea 
                        type="text" 
                        class="form-control" 
                        name="front"
                        id="front" 
                        placeholder={cardId.front}
                        value={cards.front}
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
                        placeholder={cardId.back} 
                        value={cards.back}
                        onChange={handleChange}
                    />
            </div>
        </form>
        <div>
            <div className='row'>
                <div className='col'>
                    {/* figure this out  */}
                    <button onClick={handleCancel} className='btn btn-secondary text-left'>Cancel</button> {/* idk if can import handle functions into this */}
                    <button onClick={handleSubmit} className='btn btn-primary text-left'>Submit</button> {/* text right or float right ?  */}
                </div>
            </div>
        </div>
    </div>
    )
}