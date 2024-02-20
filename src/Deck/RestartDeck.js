import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DeckVeiw from './DeckView'

// kind of done -- go over in chat 
function RestartDeck({ setCards }) { // do i need to add cards in prop

    const [isFinished, setIsFinished] = useState(false)

    const finishTask = () => {
        if (window.confirm('Restart Cards? Click cancel to return to the home page.' )) {
            setIsFinished(true)
        }
    }


    const restartTask = () => {
        setIsFinished(false)
        setCards(0)
    }

    return (
        <div>
            {isFinished ? (
                <button onClick={restartTask}>OK</button>
            ) : (
                <Link to='/'><button>Cancel</button></Link>
            )}
        </div>
    )
}


export default RestartDeck;