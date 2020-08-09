import React from 'react'
import { Container, Card } from 'react-bootstrap'
import Iframe from 'react-iframe'

class Accueil extends React.Component {

    render() {
        return (
            <Container className="text-center" style={{ marginTop: 130 }}>

                <Card border="dark">
                    <Card.Header>Stats View</Card.Header>
                    <Card.Body>
                        <Card.Title>Primary Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>


                <Card border="dark">
                    <Card.Header>Minecraft</Card.Header>
                    <Card.Body>
                        <Card.Title>Primary Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>

                <div className="m-5 p-0">
                    <h1>Serveur Discord <span className="dictatores">"Los Dictatores"</span> !</h1>
                    <Iframe url="https://discordapp.com/widget?id=360207498071769098&theme=dark"
                        width="100%" height="500"
                        frameBorder="0"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
                    </Iframe>  
                </div>
            </Container>
        )
    }
}

export default Accueil