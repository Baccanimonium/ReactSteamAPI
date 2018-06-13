//init express
const express = require('express');
const request = require('request');
const app = express();
const port = 3001;

//set api key
const apiKey='4AE5170C50784A3C5A53F3EB4B2F089C';



//set middleware. check all requests for file type. if there is no extension and no "/api/" route. return index.html
app.use(function (req, res, next) {
    if(/\.[a-z]|api/i.test(req.originalUrl) ===false){
        return res.sendFile(__dirname +'/dist/index.html')
    }
    next();
});

//init option for static files
const options = {
    index:"index.html",
    redirect: true,
    fallthrough: true
};
//directory for static files
app.use('/server/dist/',express.static('server/dist',options));

// steam users id's for debug
// const asd='76561197993800484'
// const asd1='76561198221958716'
// const asd2='76561198389241377'
// const toop='76561197987532004'
// const to2op='76561198221958716'


//init api routers. to gain access Steam Web API
app.get('/api/get_user/:userId', (req, response) => {
    //sending request to steamAPI
    request.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+apiKey+`&steamids=${req.params.userId}`,

        function(error, steamHttpResponse, steamHttpBody) {

        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        response.setHeader('Content-Type', 'application/json');
        response.send(steamHttpBody);
    });
})
app.get('/api/get_player_owned_games/:userId', (req, response) => {
    //sending request to steamAPI
    request.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+apiKey+`&steamid=${req.params.userId}&include_appinfo=1`,
        function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        response.setHeader('Content-Type', 'application/json');
        response.send(steamHttpBody);
    });
})
app.get('/api/get_player_game_achievements/:userId/:appId', (req, response) => {
    //sending request to steamAPI
    request.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${req.params.appId}&key=`+apiKey+`&steamid=${req.params.userId}&l=english`,
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