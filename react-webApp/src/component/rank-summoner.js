import React from 'react'
import { Card, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'
import InfoSum from './info-summoner'

class RankSummoner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerRank: [],
            isUnranked: false
        }
    }

    componentDidMount() {
        this.setState({
            summonerRank: [],
            isUnranked: false
        })
        this.getSummonerRank()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.summonerId !== this.props.summonerId) {
            this.setState({
                summonerRank: [],
                isUnranked: false
            })
            this.getSummonerRank()
        }
    }

    async getSummonerRank() {
        if (this.props.summonerId) {
            let url = "localhost:4000/getRank/" + this.props.summonerId
            let res = await fetch(url, { method: "GET" })
            var summonerRank = await res.json()
            console.log(summonerRank)
            var isUnranked = true
            summonerRank.forEach(element => {
                isUnranked = false
                if (element.queueType === "RANKED_FLEX_SR") {
                    element.queueType = "Ranked Flex"
                } else {
                    element.queueType = "Ranked Solo/Duo"
                }
            });
            this.setState({
                summonerRank: summonerRank.reverse(),
                isUnranked: isUnranked
            })
        }
    }


    render() {
        if (this.state.summonerRank.length !== 0) {
            return (
                <div className="row">
                    {this.state.summonerRank.map((item, i) =>
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