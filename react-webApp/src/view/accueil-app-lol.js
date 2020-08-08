import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import SearchSummoner from '../component/search-summoner';
import TopTier from '../component/top-tier';

class AccueilAppLol extends React.Component {

    render() {
        return (
            <Container className="accueil-app-lol">
                <Row>
                    <Col></Col>
                    <Col >
                        <h2 className="text-center"><img src={require("../img/eye-logo.png")} alt="STATS VIEW" width="300px" /></h2>
                        <SearchSummoner />
                    </Col>
                    <Col></Col>
                </Row>
                <TopTier />
            </Container>
        )
    }
}

export default AccueilAppLol