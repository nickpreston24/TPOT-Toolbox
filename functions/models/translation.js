const Model = require('./model')

module.exports = class Translation extends Model {
    constructor(id = null, title = null, language = 'English') {
        super({ id, title, language })
    }
}