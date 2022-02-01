import React from 'react'
import { Card, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'
import InfoSum from './info-summoner'
import img from '../img/elo/SILVER.png'

class RankSummoner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rank: [],
            isUnranked: false
        }
    }

    componentDidMount() {
        this.setState({
            rank: [],
            isUnranked: false
        })
        this.getSummonerRank()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.summonerId !== this.props.summonerId) {
            this.setState({
                rank: [],
                isUnranked: false
            })
            this.getSummonerRank()
        }
    }

    async getSummonerRank() {
        if (this.props.summonerId) {
            let url = "https://u7bjddoejd.execute-api.eu-west-3.amazonaws.com/prod/getrank/" + this.props.summonerId
            let res = await fetch(url, {
                method: "GET",
            })
            var summonerRank = await res.json()
            var isUnranked = true
            var rank = []

            summonerRank.forEach((element, i) => {
                if (element.queueType === "RANKED_TEAM_5x5") {
                    isUnranked = false
                    element.queueType = "Ranked Flex"
                    rank.push(summonerRank[i])
                } else if (element.queueType === 'RANKED_SOLO_5x5') {
                    isUnranked = false
                    element.queueType = "Ranked Solo/Duo"
                    rank.push(summonerRank[i])
                }
            });

            this.setState({
                rank: rank,
                isUnranked: isUnranked
            })
        }
    }


    render() {
        console.log(this.state.rank.length)
        if (this.state.rank.length !== 0) {
            return (
                <div className="row">
                    {this.state.rank.map((item, i) =>
                        <div key={i} className="col">
                            <Card className="text-center bg-dark text-light shadow">
                                <Card.Header style={{ color: "#FE4F4F" }}>{item.queueType}</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <Card.Img className="w-25" src={require("../img/elo/" + item.tier + ".png")} />
                                        {item.tier} {item.rank} {item.leaguePoints} LP
                                    </Card.Title>
                                    <Card.Text>
                                        <OverlayTrigger placement="bottom" overlay={
                                            <Tooltip>
                                                Wins : {item.wins} / Losses : {item.losses}
                                            </Tooltip>
                                        }>
                                            <span>
                                                Winrate {Math.round(item.wins * 100 / (item.losses + item.wins))} %
                                            </span>
                                        </OverlayTrigger>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    <InfoSum sum={item} />
                                </Card.Footer>
                            </Card>
                            <br />
                        </div>
                    )}
                </div>
            )
        } else if (this.state.isUnranked === true) {
            return (
                <Card className="text-center bg-dark text-light">
                    <Card.Header style={{ color: "#FE4F4F" }}>UNRANKED</Card.Header>
                </Card>
            )
        } else {
            return (
                <span>
                    <Spinner animation="border" variant="light" />
                </span>
            )
        }
    }
}

export default RankSummoner