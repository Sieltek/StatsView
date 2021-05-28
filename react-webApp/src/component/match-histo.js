import React, { useState, useEffect } from 'react'
import { Spinner, Jumbotron } from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import MatchInfo from './match-info'

const MatchHisto = (props) => {
    const endIndex = 10
    const beginIndex = 0

    const [matchInfo, setMatchInfo] = useState([])
    const [summonerHisto, setSummonerHisto] = useState({ matches: [] })
    const [champImg, setChampImg] = useState([])
    const [version, setVersion] = useState("")
    const [champInfo, setChampInfo] = useState()

    useEffect(() => {
        getVersion()
    }, [])

    useEffect(() => {
        if(version !== "") {
            getChampInfo()
        }
    }, [version])

    useEffect(() => {
        if(champInfo) {
            getSummonerMatchHisto()
        }
    }, [champInfo])

    const getVersion = async () => {
        let urlversion = "https://u7bjddoejd.execute-api.eu-west-3.amazonaws.com/prod/getversion/"
        let version = await fetch(urlversion, {
            method: "GET",
        })
        version = await version.json()
        setVersion(version[0])
    }

    const getSummonerMatchInfo = async (i, gameId) => {
        let url = "https://u7bjddoejd.execute-api.eu-west-3.amazonaws.com/prod/getmatch/" + gameId
        let res = await fetch(url, {
            method: "GET",
        })
        var matchInfo = await res.json()
        var participantId = null
        var resultGame = null
        if (matchInfo.participantIdentities) {
            matchInfo.participantIdentities.forEach(element => {
                if (element.player.accountId === props.accountId) {
                    participantId = element.participantId
                }
            });
            matchInfo.participants.forEach(element => {
                if (element.participantId === participantId) {
                    resultGame = element.stats.win
                }
            });
            return [i, matchInfo, resultGame]
        }
    }

    const getChampInfo = async () => {
        let urlchamp = "https://u7bjddoejd.execute-api.eu-west-3.amazonaws.com/prod/getchamp/" + version
        let res = await fetch(urlchamp, {
            method: "GET",
        })
        var valJson = await res.json()
        valJson = Object.entries(valJson.data)
        setChampInfo(valJson)
    }

    const getChampId = (id, id_champ) => {
        for (var i = 0; i < champInfo.length; i++) {
            if (champInfo[i][1]['key'] === id_champ.toString()) {
                return champInfo[i][0]
            }
        }
    }

    const getSummonerMatchHisto = async () => {
        if (props.accountId) {
            let champImgCopy = []
            let url = "https://u7bjddoejd.execute-api.eu-west-3.amazonaws.com/prod/getmatchlist/" + props.accountId + "/endIndex=" + endIndex + "&beginIndex=" + beginIndex
            let res = await fetch(url, {
                method: "GET",
            })

            var summonerHisto = await res.json()
            var resultSummonerMatchInfo = []
            console.log(summonerHisto)

            const promises = summonerHisto.matches.map(async (element, i) => {
                champImgCopy[i] = getChampId(i, element.champion)
                return await getSummonerMatchInfo(i, element.gameId)
                //return resultSummonerMatchInfo
            });

            resultSummonerMatchInfo = await Promise.all(promises)

            setChampImg(champImgCopy)
            setSummonerHisto(summonerHisto)
            setMatchInfo(resultSummonerMatchInfo)
        }
    }

    console.log("matchInfo", matchInfo)
    console.log("champImg", champImg)

    return (
        summonerHisto && matchInfo.length ?
            <div className="m-2">
                <hr></hr>
                {summonerHisto.matches.map((item, i) =>
                    <a className="game-histo text-reset text-decoration-none" key={i} href={"#" + item.gameId} rounded="true">
                        <Jumbotron className="row m-3 p-0 shadow" style={matchInfo[i][2] ? styles.win : styles.lose} rounded="true">
                            <div className="col-2 text-center">
                                <img className="rounded mt-2" anonymous="true" width="80px" src={champImg[i] ? "https://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/" + champImg[i] + ".png" : ""} alt="" rounded="true" /> <br />
                                <span className="badge badge-pill badge-dark  p-1 mb-1"><TimeAgo date={item.timestamp + 60000 * 17} /></span>
                            </div>
                            <div className="col-10">
                                Game id : {item.gameId}<br />
                                <MatchInfo match={item.gameId} accountId={props.accountId} />
                            </div>
                        </Jumbotron>
                    </a>
                )}
            </div>
            :
            <div>
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
    )
}

const styles = {
    win: {
        background: "rgb(48, 92, 137, 0.5)",
        backgroundImage: `url(${require('../img/victory.png')})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    },
    lose: {
        background: "rgb(160, 62, 62, 0.5)",
        backgroundImage: `url(${require('../img/defeat.png')})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    }
}

export default MatchHisto