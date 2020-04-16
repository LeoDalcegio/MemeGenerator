import React, { Component } from 'react';
import html2canvas from 'html2canvas';

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

    handleDownload = () => {
        html2canvas(document.body).then(function(canvas) {
            document.querySelector('#download-image').setAttribute('href',canvas.toDataURL('image/jpg'));
            document.querySelector('#download-image').setAttribute('download', 'image.jpg');
        });

        var a = document.querySelector('#download-image');

        a.click();
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

                    <button type="submit">Generate</button>

                    <button type="button" onClick={this.handleDownload}>Download</button>
                </form>
                <div className='meme'>
                    <img id="img" src={this.state.randomImg} alt='' />
                    <a id="download-image" href="#"/>

                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;