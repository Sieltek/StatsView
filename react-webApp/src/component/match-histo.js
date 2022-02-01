import React, { useState, useEffect, useRef } from 'react'
import { Spinner, Jumbotron, Button } from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import MatchInfo from './match-info'

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const MatchHisto = (props) => {
    const [beginIndex, setBeginIndex] = useState(0)

    const [matchInfo, setMatchInfo] = useState([])
    const [summonerHisto, setSummonerHisto] = useState([])
    const [champImg, setChampImg] = useState([])
    const [version, setVersion] = useState("")
    const [champInfo, setChampInfo] = useState()

    useEffect(() => {
        getVersion()
    }, [])

    useEffect(() => {
        if (version !== "") {
            getChampInfo()
        }
    }, [version])

    useEffect(() => {
        if (champInfo) {
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
        console.log(matchInfo, i)
        var participantId = null
        var resultGame = null
        var champ = null
        if (matchInfo.metadata) {
            matchInfo.metadata.participants.forEach(element => {
                if (element === props.data.puuid) {
                    participantId = element
                }
            });
            matchInfo.info.participants.forEach(element => {
                if (element.puuid === participantId) {
                    resultGame = element.win
                    champ = element.championName
                }
            });
            return [i, matchInfo, resultGame, champ]
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

    const getSummonerMatchHisto = async () => {
        if (props.data.puuid) {
            let champImgCopy = []
            let url = "https://u7bjddoejd.execute-api.eu-west-3.amazonaws.com/prod/getmatchlist/" + props.data.puuid + "/start=" + beginIndex + "&count=" + 10
            let res = await fetch(url, {
                method: "GET",
            })
            console.log(url)
            var summonerHistoTmp = await res.json()

            const promises = summonerHistoTmp.map(async (element, i) => {
                let matchData = await getSummonerMatchInfo(i, element)
                champImgCopy[i] = matchData[3]
                return matchData
            });

            let resultSummonerMatchInfoTmp = await Promise.all(promises)
            let resultSummonerMatchInfo = [...matchInfo]
            resultSummonerMatchInfoTmp.forEach((matches) => {
                resultSummonerMatchInfo.push(matches)
            })

            let summonerHistoPrev = { ...summonerHisto }
            let summonerHistoNew = {
                ...summonerHistoPrev
            }
            let champImgNew = [...champImg, ...champImgCopy]
            console.log(summonerHistoNew)
            setChampImg(champImgNew)
            setSummonerHisto(summonerHistoTmp)
            setMatchInfo(resultSummonerMatchInfo)
        }
    }

    const loadMore = () => {
        setBeginIndex(currentVal => currentVal + 10)
    }

    return (
        summonerHisto.length && matchInfo.length ?
            <div className="m-2">
                <hr></hr>
                {summonerHisto.map((item, i) =>
                    matchInfo[i] ?
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
                        :
                        null
                )}
                <Button onClick={loadMore} >More</Button>
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