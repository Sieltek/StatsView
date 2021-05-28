import React from 'react'
import { Container } from 'react-bootstrap'

class ChampionInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            champInfo: {}
        }
    }

    async getChampionInfo() {
        let url = "http://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion/" + this.props.match.params.name + ".json"
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
            <Container><h3>this.props.match.params.name</h3></Container>
        )
    }
}

export default ChampionInfo