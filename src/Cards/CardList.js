import React from 'react'
import DeckView from '../Deck/DeckView'

// REVIEWED AND REVISED 

function CardList({ cards, setCards }) {
    if (cards) {
        return (
            cards.map((card) => (
                <div className='card' justify-content-between bm-1 key={card.id}>
                    <div className='full-column'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='card'>
                                    <div className='card-body'>
                                        {card.front}
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='card'>  {/* do i need this a second time  */}
                                    <div className='card-body'>
                                        {card.back}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )
    }
}

export default CardList;