import React from 'react'
import EditCard from '../Cards/EditCard'


function EditCardForm({ deck, card }) {


    /*
    need to do : 
    - breadcrumb nav bar 
    - links to home 
    - name of deck of edited card
    - text Edit Card :cardId
    - form styling 
    - buttons 
    - aligning buttons 
    - submit & cancel bring to deck screen 
    
    */
    return (
        <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"> {/* is home right */}
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="#">{deck.name}</a></li> {/*figure out how to get deck name */}
                <li class="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h2>{deck.name}: Add Card</h2>
        <form>
            <div className='row'>
                <div className='col-12'>
                    <div className='mb-3'>
                        <label for='front'>Front</label>
                        <textarea
                            id='front'
                            type='front'
                            name='front'
                            value={card.front}
                            onChange={handleChange}
                            class='form-control'
                            placeholder='?' // placeholder ? i think it's text 
                        >
                        </textarea>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='mb-3'>
                        <label for='back'>Back</label>
                        <textarea
                            id='back'
                            type='back'
                            name='back'
                            onChange={handleChange}
                            value={card.back}
                            placeholder='Back side of card'
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        </form>
        <div>
            <div className='row'>
                <div className='col'>
                    <button onClick={handleCancel} className='btn btn-secondary text-left'>Cancel</button>
                    <button onClick={handleSubmit} className='btn btn-primary text-left'>Submit</button> {/* text right or float right ?  */}
                </div>
            </div>
        </div>
    </div>
    )

}