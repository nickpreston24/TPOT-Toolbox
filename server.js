const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();

const defaults = {
    PORT: 3000,
}

class Server {

    constructor(...config) {
        //Initialize (map) from config, usually a .env
        if (config) {
            console.log('assigning from config', config);
            Object.assign(this, ...config)
        }
        //Initialize defaults manually:
        else {
            this.PORT = process.env.PORT || 3000;
        }

        this.initExpress();
    }

    /**
     * Initialization boilerplate
     */
    initExpress = () => {
        this.app = express();
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(express.json());

        if (this.environment === "production")
            app.use(express.static("build"));

        // this.routes = require('./routes');
    }

    toString() {
        return `🌎  ==> API server now on port ${this.PORT}!`;
        // + !server.uri  ? server.uri : `\n database uri: ${server.uri}`;
    }

    start() {
        this.app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "./build/index.html"));
        });

        this.app.listen(this.PORT, () => console.log(this.toString()));
    }
}

server = new Server(defaults);
server.start();