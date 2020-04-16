import React from 'react';

import './styles.css';

export default function Meme(props) {
    return(
        <div className='meme'>
            <img src={props.randomImg} alt='' />
            <h2 className='top'>{props.topText}</h2>
            <h2 className='bottom'>{props.bottomText}</h2>
        </div>
    )
}
