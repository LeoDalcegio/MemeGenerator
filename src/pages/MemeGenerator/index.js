import React, { Component } from 'react';

import './styles.css';

class MemeGenerator extends Component {
    state = {
        topText: '',
        bottomText: '',
        randomImg: 'http://i.imgflip.com/1bij.jpg',
        allMemeImgs: []
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({allMemeImgs: memes})
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({[name]: value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randomMemeImg = this.state.allMemeImgs[randomIndex].url 
        this.setState({randomImg: randomMemeImg})
    }

    render() {
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        value={this.state.topText}
                        name='topText'
                        placeholder='Top Text'
                        onChange={this.handleChange}
                    />

                    <input
                        type='text'
                        value={this.state.bottomText}
                        name='bottomText'
                        placeholder='Bottom Text'
                        onChange={this.handleChange}
                    />

                    <button>Generate</button>

                    <button>Download</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;