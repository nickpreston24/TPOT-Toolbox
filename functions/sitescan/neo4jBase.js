const Connection = require('./connection');

/**
 * A base controller for running neo4j queries.
 */
class Neo4jBase {
    constructor(config) {

        if (!config || Object.values(config).some(prop => !prop))
            throw new Error('Config cannot have null values!')

        this.driver = new Connection(config).driver;
    }

    /**
     * Closes driver on app close and should be called during tests
     */
    dispose() {
        this.driver.close();
    }
}

module.exports = Neo4jBase;