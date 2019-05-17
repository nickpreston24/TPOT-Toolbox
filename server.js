/*	Author: Michael Preston
 *	Created Date: "04-09-2019"
 */
//Source: https://github.com/mooradal/youtubeDownloader
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
// const fs = require('fs');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Youtube Downloads Server Listening on Port ' + PORT);
})

// Sample usage in client: axios.get('/download?URL=${url}`')
app.get('/download', (req, res) => {
    var URL = req.query.URL;
    console.log('Received call for downloading video.  Url:', URL);

    let savePath = __dirname + '/' + (req.fileName || "video.mp4"); //TODO: set extension dynamically.
    console.log('saving as file: ' + savePath);
    console.log('request: ', req.option);

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    let stream =
        ytdl(URL, {
            format: 'mp4'
        })
        .pipe(res)
    // .pipe(req.option && req.option === "drive" ? res : fs.createWriteStream(savePath)) //Pipes back to response or saves locally.
    res.send(stream);
    return stream;
});

//     ytdl(URL, {
//         format: 'mp4'
//     }).pipe(res);
// });

// Src: https://github.com/jkvora/Youtube-downloder/blob/master/server.ts
app.get('/video', function (req, res) {
    console.log("In youtube Routes:GET");

    var strUrl = req.query.url;

    var ytstream = ytdl(strUrl);
    //var tempFile = fs.createWriteStream('/video');

    res.setHeader("Content-Type", "application/octet-stream");
    res.writeHead(200);

    ytstream.on('data', function (data) {
      res.write(data);
    })

    ytstream.on('end', function (data) {
      res.send();
    })
  })

