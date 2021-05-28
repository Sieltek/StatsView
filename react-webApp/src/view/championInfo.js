import React from 'react'
import { Container } from 'react-bootstrap'

class ChampionInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            champions: []
        }
    }

    async getAllChampions() {
        let url = "https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json"
        let res = await fetch(url, {
            method: "GET",
        })
        var response = await res.json()
        console.log(response.data);
        //transforme the object in a alist
        var tolist = Object.entries(response.data);

        console.log(tolist);
        this.setState({
            champions: tolist
        })
    }

    componentDidMount() {
        this.getAllChampions();
    }

    render() {
        return (
            <Container  className="accueil-app-lol">
                <ul>
                    {
                        this.state.champions.map((item, i) =>
                            <li><a href={'/StatsView/champion/' + item[0]}>{item[0]}</a>, {item[1].version}</li>
                        )
                    }
                </ul>
            </Container>
        )
    }
}

export default ChampionInfo