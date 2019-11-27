/**
 * Returns a single forum post, properly formatted
 */
function formatSinglePost({ post, translation }) {

    const text = `We have a new translation in ${translation.language}: \

        [url=${translation.url}]${translation.title}[/url] (${post.title}) \

        ${translation.excerpt}  [url=${translation.url}]${readMoreLookup[translation.language]}...[/url] \

        Click [url=${post.url}]HERE[/url] to read this writing in English.`

    return text;
}

const readMoreLookup = {
    English: "Read More",
    Spanish: "Lee Mas",
    Chinese: "閱讀更多"
}

function getDateString() {

    const date = new Date();

    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const day = date.getUTCDay();

    return `${month}/${day}/${year}`
}

function formatMultiplePosts(list) {
    // list[0].translation.language = "any"
    // if (list.some(p => p.translation.language !== list[0].translation.language))
    //     throw new Error('All posts must have the same language!')
    // console.log('posts:', list.length);
    return `${getDateString()}: We have ${list.length} new translations in ${list[0].translation.language}.` + "\n\n"
        + list.map((post, index) => `\n${index + 1}.) ` + post.post.title).join('')
        + "\n\n"
        + list.map((post, index) => `\n${index + 1}.) ` + formatSinglePost(post)).join('\n\n')
}

/**
 * Selector function
 */
async function formatPost(posts) {
    return Array.isArray(posts)
        ? formatMultiplePosts(posts)
        : getDateString() + ": " + formatSinglePost(posts)
}

exports.formatPost = formatPost