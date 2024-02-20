import React from 'react'
import AddCards from '../Cards/AddCards'


/* still unsure : 
    - figure out how to reference deck name
    


*/

/* done : 
    - breadcrumb bar  
    - heading 
*/


function AddCardForm({ decks,  handleDone, handleSave }) {

    return (
        <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
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
                            class='form-control'
                            placeholder='Front side of card'
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
                    <button onClick={handleDone} className='btn btn-secondary text-left'>Done</button>
                    <button onClick={handleSave} className='btn btn-primary text-left'>Save</button> {/* text right or float right ?  */}
                </div>
            </div>
        </div>
    </div>
    )
}