import React from 'react'
import { Spinner, Jumbotron } from 'react-bootstrap'
import TimeAgo from 'react-timeago'
// import MatchInfo from './match-info'

class MatchHisto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            matchInfo: [],
            summonerHisto: {
                matches: []
            },
            champImg: [],
            updated: false,
        }
    }

    componentDidMount() {
        this.getSummonerMatchHisto()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.accountId !== this.props.accountId) {
            this.getSummonerMatchHisto();
        }
    }

    async getSummonerMatchInfo(i, gameId) {
        let url = "http://localhost:4000/getMatch/" + gameId
        let res = await fetch(url, { method: "GET" })
        var matchInfo = await res.json()
        var participantId = null
        var resultGame = null
        if (matchInfo) {
            matchInfo.participantIdentities.forEach(element => {
                if (element.player.accountId === this.props.accountId) {
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
        return [i, matchInfo, resultGame]
    }

    async getChampId(id, id_champ) {
        var champImg = this.state.champImg
        let url = "http://localhost:4000/getchamp"
        let res = await fetch(url, { method: "GET" })
        var valJson = await res.json()
        valJson = Object.entries(valJson.data)
        for (var i = 0; i < valJson.length; i++) {
            if (valJson[i][1]['key'] === id_champ.toString()) {
                champImg[id] = valJson[i][0]
                break;
            }
        }
        this.setState({
            champImg: champImg
        })
    }

    async getSummonerMatchHisto() {
        if (this.props.accountId) {
            var champImg = []
            let url = "http://localhost:4000/getMatchList/" + this.props.accountId + "/endIndex=10&beginIndex=0"
            let res = await fetch(url, { method: "GET" })
            var summonerHisto = await res.json()
            var resultSummonerMatchInfo = []
            summonerHisto.matches.forEach(async (element, i) => {
                this.getChampId(i, element.champion)
                resultSummonerMatchInfo[i] = await this.getSummonerMatchInfo(i, element.gameId)
                if (resultSummonerMatchInfo.length === summonerHisto.matches.length) {
                    this.setState({
                        updated: true,
                    });
                }
            });
            this.setState({
                summonerHisto: summonerHisto,
                champImg: champImg,
                matchInfo: resultSummonerMatchInfo,
            })
        }
    }

    render() {
        if (this.state.updated) {
            return (
                <div className="m-2">
                    <hr></hr>
                    {this.state.summonerHisto.matches.map((item, i) =>
                        <a className="game-histo text-reset text-decoration-none" key={i} href="#" rounded="true">
                            <Jumbotron className="row m-3 p-0 shadow" style={this.state.matchInfo[i][2] ? styles.win : styles.lose} rounded="true">
                                <div className="col-2 text-center">
                                    <img className="rounded mt-2" anonymous="true" width="80px" src={this.state.champImg[i] ? "http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/" + this.state.champImg[i] + ".png" : ""} alt="" rounded="true" /> <br />
                                    <span className="badge badge-pill badge-dark  p-1 mb-1"><TimeAgo date={item.timestamp + 60000 * 17} /></span>
                                </div>
                                <div className="col-10">
                                    Game id : {item.gameId}<br />
                                    {/* <MatchInfo match={item.gameId} accountId={this.props.accountId} /> */}
                                </div>
                            </Jumbotron>
                        </a>
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    <Spinner animation="border" role="status" variant="secondary">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
    }
}

const styles = {
    win: {
        background: "rgb(48, 92, 137, 0.5)",
    },
    lose: {
        background: "rgb(160, 62, 62, 0.5)",
    },
}

export default MatchHisto