import React from 'react'
import InputSummoner from '../component/input-summoner'
import { Container } from 'react-bootstrap'

const styles = {
    title: {
        color: "#FE4F4F",
    },
    bandeau: {
        backgroundColor: "#343A40",
    }
}

function SummonerInfo(props) {
    return (
        <Container className="summonerInfo shadow-sm rounded" style={styles.bandeau}>
            <h1 style={styles.title} className="mb-4" >Summoner</h1>
            <InputSummoner pseudo={props.match.params.pseudo} />
        </Container>
    )
}

export default SummonerInfo