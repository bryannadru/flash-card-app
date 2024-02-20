import React from 'react'


function CreateDeckForm() {

return (
<div>
    <form>
        <div class="form-group">
            <label for="name">Name</label>
            <input 
                type="text" 
                class="form-control" 
                id="name" 
                placeholder="Deck Name" 
                required
                />
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea
                type="text" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Brief description of deck" 
                required
                />
        </div>
    </form>
</div>
    )
}

export default CreateDeckForm