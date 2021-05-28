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
            champInfo: response
        })
    }

    componentDidMount() {
        this.getChampionInfo();
    }

    render() {
        return (
            <Container className="accueil-app-lol" >
                <h3>{JSON.stringify(this.state.champInfo)}</h3>
            </Container>
        )
    }
}

export default ChampionInfoIndiv