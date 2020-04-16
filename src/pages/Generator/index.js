import React, { useState, useEffect } from 'react';
import Meme from '../../components/Meme';

import './styles.css';

export default function Generator() {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [randomImg, setRandomImg] = useState('http://i.imgflip.com/1bij.jpg');
    const [allMemeImgs, setAllMemeImgs] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(response.data)
                setAllMemeImgs({allMemeImgs: memes})
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const randomIndex = Math.floor(Math.random() * allMemeImgs.length);
        const randomMemeImg = allMemeImgs[randomIndex].url 
        setRandomImg({randomImg: randomMemeImg})
    }

    return(
        <div>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={topText}
                    name='topText'
                    placeholder='Top Text'
                    onChange={e => setTopText(e.target.value)}
                />

                <input
                    type='text'
                    value={bottomText}
                    name='bottomText'
                    placeholder='Bottom Text'
                    onChange={e => setBottomText(e.target.value)}
                />

                <button>Generate</button>

                <button>Download</button>
            </form>

            <Meme randomImg={randomImg} topText={topText} bottomText={bottomText}/>
        </div>
    )

}
