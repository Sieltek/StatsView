var request = require('request');
const express = require('express')
var cors = require('cors')
var https = require('https')
const app = express()
var fs = require('fs');
app.use(cors())

const api_key = require('./api-key.json')

var api_lol = api_key.api_lol

// get all info on player by summoner name
app.get('/getSummoner/:summonerName', async (req, res) => {
  var summonerName = req.params.summonerName
  request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + api_lol, function (error, response, body) {
    res.send(body)
  });
})

// get the rank of a player
app.get('/getRank/:summonerId', async (req, res) => {
  var summonerId = req.params.summonerId
  request('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerId + '?api_key=' + api_lol, function (error, response, body) {
    res.send(body)
  });
})

// get the games of a player
app.get('/getMatchList/:accoundId/:parameters', async (req, res) => {
  var accoundId = req.params.accoundId
  var parameters = req.params.parameters
  request('https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accoundId + '?api_key=' + api_lol + "&"+ parameters, function (error, response, body) {
    res.send(body)
  });
})

// get match info
app.get('/getMatch/:idMatch', async (req, res) => {
  var idMatch = req.params.idMatch
  request('https://euw1.api.riotgames.com/lol/match/v4/matches/' + idMatch + '?api_key=' + api_lol, function (error, response, body) {
    res.send(body)
  });
})

// get top tiers champ by lane
app.get('/TopTier', async (req, res) => {
  request('https://euw.op.gg/champion/statistics', function (error, response, body) {
    res.send({ body })
  });
})

// get top tiers champ by lane
app.get('/getchamp', async (req, res) => {
  var version = '10.15.1'
  request('https://ddragon.leagueoflegends.com/api/versions.json', function (error, response, body) {
    version = body[0]
  });
  request('https://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/champion.json', function (error, response, body) {
    res.send(body)
  });
})

var sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(sslOptions, app).listen(4000, () => console.log('Api listening on port 4000...'))