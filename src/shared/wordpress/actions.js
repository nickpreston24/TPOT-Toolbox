import {
    wp
} from './wordpress'

const getCatg = async() => {
    wp.categories().then((response) => {
        response.forEach(r => {
            console.log(r)
        })
    })
}

const createPage = (wordpressCredentials, pageConfig, notify) => {
    // Add Authentication information to existing WPAPI instance
    wp._options = {
        ...wp._options,
        username: wordpressCredentials.username,
        password: wordpressCredentials.password,
    }
    // These are Default Options assuming that ...pageConfig has no values
    let options = {
        ...pageConfig,
        // slug: 'letters\/test\.htm',
        status: 'pending',
        author: 3, // Victor Hafichuk
        categories: [496], // letters
        date: new Date(), // publish time
    }
    // Create the page and do error checking here.
    wp.pages().create(options)
        .then((response) => {
            notify(`Page is now live at: ${response.link}`, { autoHideDuration: 10000 })
            notify('Sucessfully Published Letter to TPOT!', { variant: 'success'})
        }).catch((error) => {
            if (error.code === 'incorrect_password') {
                console.log('good')
                notify('Bad Publish Login Data: Log out and back into TPOT Cloud', { variant: 'error', autoHideDuration: 5000 })
            } else {
                notify(`Unknown Publish Error: ${error.code}`, { variant: 'error', autoHideDuration: 5000 })
            }
        })
}

export {
    createPage,
    getCatg,
}