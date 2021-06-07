import React from 'react'
import { Container } from 'react-bootstrap'

class ChampionInfoIndiv extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            champInfo: {}
        }
    }

    async getChampionInfo() {
        let url = "https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion/" + this.props.match.params.name + ".json"
        let res = await fetch(url, {
            method: "GET",
        })
        var response = await res.json()
        console.log(response);
        this.setState({
            champInfo: response.data[this.props.match.params.name] 
        })
    }

    componentDidMount() {
        this.getChampionInfo();
    }

    render() {
        return (
            <Container className="accueil-app-lol" >
                <h1>{this.state.champInfo.name}</h1>
                <h2>Lore</h2>
                <p>{this.state.champInfo.lore}</p>
                <h2>Skins</h2>
                <p>{JSON.stringify(this.state.champInfo.skins)}</p>
                <h2>Tips</h2>
                <h3>Ally</h3>
                <p>{this.state.champInfo.allytips}</p>
                <h3>Ennemy</h3>
                <p>{this.state.champInfo.enemytips}</p>
                <h3>Spells</h3>
                <p>{JSON.stringify(this.state.champInfo.spells)}</p>
            </Container>
        )
    }
}

export default ChampionInfoIndiv