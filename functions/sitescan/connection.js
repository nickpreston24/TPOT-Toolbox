class Connection {
    constructor({ ...config }) {
        if (!!config)
            Object.assign(this, config)
        else {
            Object.assign(this,
                {
                    url: "bolt://localhost",
                    user: "neo4j",
                    password: "root"
                })
        }

        this.neo4j = require('neo4j-driver').v1;        
        this.driver = this.neo4j.driver(this.url, this.neo4j.auth.basic(this.user, this.password));
    }
}

module.exports = Connection