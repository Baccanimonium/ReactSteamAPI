
const express = require('express')
const request = require('request')
const app = express()
const port = 3001

app.get('/get_user', (req, response) => {
    //sending request to steamAPI
    request.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4AE5170C50784A3C5A53F3EB4B2F089C&steamids=76561197993800484',
        function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        response.setHeader('Content-Type', 'application/json');
        response.send(steamHttpBody);
    });
})
app.get('/get_player_owned_games', (req, response) => {
    //sending request to steamAPI
    request.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=4AE5170C50784A3C5A53F3EB4B2F089C&steamid=76561197987532004&include_appinfo=1',
        function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        response.setHeader('Content-Type', 'application/json');
        response.send(steamHttpBody);
    });
})
app.get('/get_player_game_achievements', (req, response) => {
    //sending request to steamAPI
    request.get('http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=3830&key=4AE5170C50784A3C5A53F3EB4B2F089C&steamid=76561198221958716&l=english',
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