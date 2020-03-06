var request = require('request');
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

const api_key = 'RGAPI-bc168e62-08ea-4236-af13-a0270f354faf'

// get all info on player by summoner name
app.get('/getSummoner/:summonerName', async (req, res) => {
  var summonerName = req.params.summonerName
  request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + api_key, function (error, response, body) {
    res.send(body)
  });
})

// get the rank of a player
app.get('/getRank/:summonerId', async (req, res) => {
  var summonerId = req.params.summonerId
  request('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerId + '?api_key=' + api_key, function (error, response, body) {
    res.send(body)
  });
})

// get the games of a player
app.get('/getMatchList/:accoundId/:parameters', async (req, res) => {
  var accoundId = req.params.accoundId
  var parameters = req.params.parameters
  request('https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accoundId + '?api_key=' + api_key + "&"+ parameters, function (error, response, body) {
    res.send(body)
  });
})

// get match info
app.get('/getMatch/:idMatch', async (req, res) => {
  var idMatch = req.params.idMatch
  request('https://euw1.api.riotgames.com/lol/match/v4/matches/' + idMatch + '?api_key=' + api_key, function (error, response, body) {
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
app.get('/getchampId/:id', async (req, res) => {
  var id = req.params.id
  request('http://ddragon.leagueoflegends.com/cdn/10.3.1/data/en_US/champion.json', function (error, response, body) {
    res.send(body)
  });
})

app.listen(4000, () => console.log('Api listening on port 4000...'))