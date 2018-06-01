
const express = require('express')
const request = require('request')
const app = express()
const port = 3001

app.get('/asd', (req, response) => {
    //sending request to steamAPI
    request.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4AE5170C50784A3C5A53F3EB4B2F089C&steamids=76561197993800484',
        function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        response.setHeader('Content-Type', 'application/json');
        response.send(steamHttpBody);
    });
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})