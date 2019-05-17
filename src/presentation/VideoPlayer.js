import React, { Component } from 'react'
import ReactPlayer from 'react-player'
// import { FilePlayer, YouTube } from 'react-player/lib/players'
import { inject } from 'mobx-react'
import { observable, decorate } from 'mobx'
// import fileUrl from 'file-url'
// import ytdl from 'ytdl-core'
// import axios from 'axios'
// import localForage from 'localforage';
// import Video from './video.mp4'
// require('../../server')
// const ytdl = require('ytdl-core');

// var fs = require('browserify-fs');

class VideoPlayer extends Component {

    state = {
        url: null
    }

    componentDidMount() {
        // const { id } = this.props
        this.loadVideoURL()
    }

    loadVideoURL = () => {

    }

    ref = player => {
        this.player = player
    }

    downloadFile = () => {
        console.log('start download')
        // this.props.forage.videos.get()
    }

    onChooseFile = e => {

    }

    render() {
        const { id } = this.props
        console.log(this.props)
        console.log(`https://www.youtube.com/watch?v=${id}`)
        return (
            <>
                {/* <input onChange={this.onChooseFile} type='file' />
                <button onClick={this.downloadFile} >Download Blob</button> */}
                <ReactPlayer
                    ref={this.ref}
                    // url={this.state.url}
                    url={`https://www.youtube.com/watch?v=${id}`}
                    // url={`https://www.youtube.com/watch?v=fLjslMtjkhs`}
                    playing={true}
                    // autoPlay={true}
                    muted={true}
                    width="100%"
                    height="100%"
                    controls={true}
                // light={/thumbnail-url-from=parent}
                />
            </>
        )
    }
}

export default inject('forage')(decorate(
    VideoPlayer, {
        cat: observable
    }))