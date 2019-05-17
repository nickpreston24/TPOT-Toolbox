importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'
);

// : Set Persistant Variables for the life of the worker
self.refreshed = false
self.initialWorker = null
self.rest = (ms) => {
    return new Promise(r => setTimeout(r, ms));
}

// : Detailed logging is very useful during development!
workbox.setConfig({ debug: true })

self.addEventListener('message', (event) => {
    // : Activate the service worker straight away for an updated, not initial, worker
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
    // : Assume control before activated, so the page will be controlled by the worker
    if (event.data && event.data.type === 'CLIENTS_CLAIM') {
        clients.claim()
    }
    // : Inform this instance that he is the current, active worker
    if (event.data && event.data.type === 'SET_INITIAL') {
        self.initialWorker = event.data.payload
    }
    // : Set a variable that keeps track of when the page has been refreshed
    if (event.data.type === 'SET_REFRESHED') {
        self.refreshed = event.data.payload
    }
    // : Give the refresh variable to workbox-window so the client 
    // : can be prompted when updates have occured after a page refresh
    if (event.data.type === 'GET_REFRESHED') {
        event.ports[0].postMessage({
            type: 'GET_REFRESHED', payload: {
                refreshed: self.refreshed,
                initialWorker: self.initialWorker
            }
        })
    }
});

self.addEventListener('install', event => {
    event.waitUntil(
        // : Wait for client to send us the initial worker value first
        self.rest(100).then(() => {
            if (self.initialWorker === true) {
                self.skipWaiting()
            }
        })
    );
});

self.addEventListener('activate', event => {
    if (self.initialWorker === true) {
        // : If we are the initial service worker, assume control
        clients.claim()
    }
});


// : Create an instance if it doesn't already exist.
self.videos = localforage.createInstance({
    name: 'hh-video', storeName: 'data',
    description: 'this is a store'
})

workbox.routing.registerRoute(
    new RegExp('/videos/'),
    // new RegExp('https://www.youtube.com'),
    async ({ url, event }) => {
        // const videoURL = url.href.match(/https:\/\/www\.youtube\.com\/watch\?v=[A-z\d]{11}/g)[0]
        // const videoID = url.search.match(/\?v=[A-z\d]{11}/g)[0].slice(3)
        // console.log(`Video URL: ${videoURL}`)
        // console.log(`Video ID: ${videoID}`)
        const videoUrl = url.href
        self.videos.setItem(`${videoUrl}}`, videoUrl)
            .then((value) => {
                console.log(`Downloading ${videoUrl} from Youtube...`)
                console.log('<3')
                hello();
                testscript.hello();

                let stream = ytdl(videoUrl, {
                    format: 'mp4'
                });
                console.log('stream: ', stream);

                // console.log(`Set [${videoUrl}] as '${value}'`)
            })
            .catch(function (err) {
                console.error(`Video ${videoUrl} Failed to Download`, err)
            });

        return new Response({ text: `Returned [${videoUrl}]` });
})

// : Register custom caching strategy for videos
workbox.routing.registerRoute(
    new RegExp('/videos/'),
    // new RegExp('https://www.youtube.com'),
    async ({ url, event }) => {
        // const videoURL = url.href.match(/https:\/\/www\.youtube\.com\/watch\?v=[A-z\d]{11}/g)[0]
        // const videoID = url.search.match(/\?v=[A-z\d]{11}/g)[0].slice(3)
        // console.log(`Video URL: ${videoURL}`)
        // console.log(`Video ID: ${videoID}`)
        const videoID = url.href
        self.videos.setItem(`${videoID}}`, videoID)
            .then((value) => {
                console.log(`Downloading ${videoID} from Youtube...`)
                console.log(`Set [${videoID}] as '${value}'`)
            })
            .catch(function (err) {
                console.error(`Video ${videoID} Failed to Download`, err)
            });

        return new Response({ text: `Returned [${videoID}]` });
    }
)

// : Loads route, vender, and extension based bundles. This is required to go at the end.
workbox.precaching.precacheAndRoute([]);
