import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import SearchSummoner from '../component/search-summoner';
import TopTier from '../component/top-tier';

class Accueil extends React.Component {

    render() {
        return (
            <Container className="accueil">
                <Row>
                    <Col></Col>
                    <Col >
                        <h1><img src={require("../img/eye-logo.png")} alt="STATS VIEW" width="400px" /></h1>
                        <SearchSummoner />
                    </Col>
                    <Col></Col>
                </Row>
                <TopTier />
            </Container>
        )
    }
}

export default Accueil