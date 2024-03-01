import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// REVIEWED AND REVISED -- needs corrections 
function RestartDeck() { // do i need to add cards in prop

    const [isFinished, setIsFinished] = useState(false)
    const [currentCardIndex, setCurrentCardIndex] = currentCardIndex(0)

    const finishTask = () => {
        setIsFinished(true)
    }

    // go over this 
    const restartTask = () => {
        if (window.confirm('Restart Cards? Click cancel to return to the home page.' )) {
            setIsFinished(false)
            setCurrentCardIndex(0)
        }
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
    // need to style ^ 
}


export default RestartDeck;