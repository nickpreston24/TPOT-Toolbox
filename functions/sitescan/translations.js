const { Translation, Author } = require('../models');
const BaseController = require('./neo4jBase');

class TranslationsController extends BaseController {

    /**
     * Find a specific translation by its Id
     * @param {*} id 
     */
    async findById(id = null, includeAuthors = false) {

        const session = this.driver.session();
        let query = `MATCH (translation:Translation) WHERE id(translation) = ${id} `;

        query += !includeAuthors
            ? `return translation`
            : `OPTIONAL MATCH(translation)-[:Authored_By]->(author: Person) \ return translation, author`;

        return session
            .run(query, { id: parseInt(id) })
            .then(result => {

                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                if (!record)
                    return null;

                const translation = record.get('translation');
                const author = new Author(includeAuthors ? record.get('author') : {});

                return new Translation(
                    id,
                    translation.properties.title,
                    author
                );
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }

    async create(translation = {}) {

        const session = this.driver.session();
        console.log('creating translation: ', translation.title);

        const { title, ingredients, instructions } = translation;

        return session.run(
            `MERGE (translation:Translation {title: $title, ingredients: $ingredients}) \
            return translation`, { title, ingredients, instructions })
            .then(result => {

                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                return new Translation(
                    parseInt(record.get(0).identity.low),
                    record.get('translation').properties.title
                );
            })
            .catch(error => {
                session.close();
                throw error;
            });

    }

    /**
     * Gets contributors to a given translation name or title
     * @param {*} title 
     */
    async getContributors(title = null) {
        const session = this.driver.session();

        return session
            .run(
                "MATCH (translation:Translation {title: $title}) \
                OPTIONAL MATCH (translation)<-[r]-(person:Person) \
                RETURN translation.title AS name, \
                collect([person.firstName, person.lastName]) AS author \
                LIMIT 1", { title })
            .then(result => {
                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                return record;
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }

    /**
     * Get a percentage language coverage for a given teaching
     */
    async getCoverage(title = null) {

        // Match (paper:Paper {title: $title)-[:Has_Translation]->(translation:Paper)
        // Match (langs:Language)
        // return count(l) / count(langs) as 

        return 3 / 8 * 1.0;
    }

    /**
     * Get all translations
     */
    async get(skip = 0, take = 0, limit = 10) {
        const session = this.driver.session();
        let query = `MATCH (translation:Translation) return translation, ID(translation) as id `;

        if (skip > 0)
            query += `SKIP ${skip}`;
        if (take > 0)
            query += `TAKE ${take}`;
        if (limit > 0)
            query += `LIMIT ${limit}`;

        console.log('query: ', query)

        return session
            .run(query)
            .then(result => {
                session.close();

                // console.log('result', result);

                if (!result.records)
                    return null;

                // Map all properties (like an ORM would):
                const translations = result.records
                    .map(record => {
                        return new Translation({
                            id: record.get(0).identity.low,
                            title: record.get('translation').properties.title
                        });
                    })

                return translations;
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }

    deletionModeMap = {
        nodesOnly: ` delete `,
        relationshipsOnly: `-[r:*]->() \ delete`,
        all: ` detach delete `
    }

    async delete(id = null, mode = 'all') {
        console.log('Deleting translation ', id)

        let query = `MATCH (r:Translation {id: $id})`
        query += this.deletionModeMap[mode] + " r";

        const session = this.driver.session();

        return session
            .run(query, { id })
            .then(result => {
                session.close();

                console.log('Query: ', query)

                if (!result.records)
                    return null;

                let record = result.records[0];

                return record;
            })
            .catch(error => {
                session.close();
                throw error;
            });

    }


    async updateTranslation(props) {
        const newTranslation = new Translation(props);
        // console.log('here is the updated translation: ', newTranslation);

        let query = `MATCH (translation:Translation {id: ${newTranslation.id}})`;

        if (newTranslation.title)
            query += `SET translation.title = ${newTranslation.title}`;

        const session = this.driver.session();

        return session.run(query)
            .then(result => {
                session.close();

                if (!result.records)
                    return null;

                return newTranslation;
            })
    }


    // async sampleTransaction() {

    //     const session = this.driver.session();

    //     var promise = session.readTransaction(transaction => {
    //         var result = transaction.run(
    //             'MATCH (translation:Translation {title: $title}) return translation.title',
    //             { title: 'Cannoli' }
    //             // 'MATCH (person:Person) RETURN person.name AS name'
    //         );
    //         return result;
    //     })

    //     promise.then(result => {
    //         // session.close();
    //         this.driver.close();
    //         console.log(result.records);
    //     }).catch(console.error)
    // }

}

module.exports = TranslationsController
