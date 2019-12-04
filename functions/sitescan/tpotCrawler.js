// const { TranslationsController } = require('./translations')
var WPAPI = require('wpapi');
var wp = new WPAPI({
    endpoint: "https://www.thepathoftruth.com/wp-json",
    username: 'username',
    password: 'password'
});

const config = {
    wpapi: {
        endpoint: process.env.WP_ENDPOINT,
        username: process.env.WP_USERNAME,
        password: process.env.WP_PASSWORD
    },
    neo4j: {

    }
};

/**
 * The main proxy or entrypoint for TPOT sitescan webcrawler
 */
class tpotCrawler {
    constructor() {
        // this.translations = new TranslationsController(config.neo4j);
    }

    // PUT
    crawl(url) {
        console.log(`Finding all links within ${url}...`)

        WPAPI.discover('http://www.thepathoftruth.com')
            .then(function (site) {
                // Apply an arbitrary `filter` query parameter:
                // All posts belonging to author with given nicename 
                wp.posts().filter('author_name', 'Victor Hafichuk').get();

                // Query by the slug of a category or tag:                
                // wp.posts().filter({
                //     category_name: 'issuesoflife',
                //     tag: ['translations', 'spanish']
                // })

                // Query for a page at a specific URL path
                wp.pages().filter('pagename', url)
            });
    }

    //GET
    findTranslationConverage() {
        // translations.getCoverage();
    }
}

module.exports = tpotCrawler