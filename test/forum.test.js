var assert = require('assert');
const { formatPost } = require('../functions/src/forumPost.js')
console.log(formatPost)

//A PHP BB post:
const forumPost = {
    post: {
        title: "Here is the Way it is",
        url: "https://www.thepathoftruth.com/teachings/here-is-the-way-it-is.htm"
    },
    translation: {
        excerpt: "這篇文章告訴你真正所需要知道的，以確定在你的生活中的靈性方位。你需要朝著正確的方向前進，按照上帝的旨意進入生活，那個在祂裡面找到的生活。任何舊的方式都不行，宗教不行，哲學不行。通過離開那條滅亡的寬闊路徑，而要從窄門進去，我們傳道的那個道路，你會找到上帝。",
        url: "https://www.thepathoftruth.com/chinese/here-is-the-way-it-is_chinese.htm",
        title: "事情是這樣的",
        language: "Chinese",
    }
}

describe('Forum Post format test', function () {
    it('should return a TPOT forum post',
        async function () {
            const post = await formatPost(forumPost);
            console.log(post);
            return post;
        })
})

describe('[Multiple] Forum Post format test', function () {
    it('should return a series of TPOT forum posts',
        async function () {
            const posts = await formatPost(new Array(5).fill(forumPost));
            console.log(posts);
            return posts;
        })
})