// React
import React, { Component } from 'react'
import './ConvertBox.css'

// Electron
const electron = window.require('electron')
const remote = electron.remote

// Node Built-In

// Custom/Community
const cat = require('../modules/cat')
const convert = require('../modules/converter')
const rn = require('random-number')



class Name extends Component {
    constructor(props) {
        super(props)
        this.name = "Braden " + rn()

        this.state = {
            boxContent: '',
        };
    }

    convertFile = () => {
        convert.convertFile('sample.docx')
        this.setState({ boxContent: "File was converted" });
    };

    render() {
        return (
            <div className="convertBox">
                <button className="button" onClick={this.convertFile}>Convert File</button>
                <div className="box">{this.state.boxContent}</div>
            </div>
        )
    }
}

export default Name 