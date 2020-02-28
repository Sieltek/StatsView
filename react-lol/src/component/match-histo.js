import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import TimeAgo from 'react-timeago'

class MatchHisto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerHisto: {
                matches: []
            },
            champImg: []
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

    async getChampId(id, id_champ) {
        var champImg = this.state.champImg
        let url = "http://localhost:4000/getchampId/" + id_champ
        let res = await fetch(url, { method: "GET" })
        var valJson = await res.json()
        valJson = Object.entries(valJson.data)
        for (var i = 0; i < valJson.length; i++) {
            if (valJson[i][1]['key'] === id_champ.toString()) {
                champImg[id] = valJson[i][0]
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
            summonerHisto.matches.forEach((element, i) => {
                this.getChampId(i, element.champion)
            });
            console.log(summonerHisto)
            this.setState({
                summonerHisto: summonerHisto,
                champImg: champImg,
            })
        }
    }


    render() {
        return (
            <div className="m-2">
                <hr></hr>
                {this.state.summonerHisto.matches.map((item, i) =>
                    <a className="game-histo text-reset text-decoration-none" href="#" rounded>
                        <Jumbotron className="row m-3 p-0 shadow" style={{ background: "#4C555E" }} key={i} rounded="true">
                            <div className="col-2 text-center">
                                <img className="rounded mt-2" anonymous="true" width="80px" src={"http://ddragon.leagueoflegends.com/cdn/10.3.1/img/champion/" + this.state.champImg[i] + ".png"} alt="" rounded="true" /> <br />
                                <span className="badge badge-pill badge-dark  p-1 mb-1"><TimeAgo date={item.timestamp + 60000 * 17} /></span>
                            </div>
                            <div className="col-10">
                                Game id : {item.gameId}<br />
                                Role : {item.role}<br />
                                Lane : {item.lane}<br /><br />
                            </div>
                        </Jumbotron>
                    </a>
                )}
            </div>
        )
    }
}

export default MatchHisto