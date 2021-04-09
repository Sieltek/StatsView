import React from 'react'
import { Container } from 'react-bootstrap'
import Iframe from 'react-iframe'

class Accueil extends React.Component {

    render() {
        return (
            <Container className="text-center" style={{ marginTop: 130 }}>

                <div className="blog-card">
                    <div className="meta">
                        <div className="photo photo-statsview" style={{ backgroundColor: "#343A40" }}></div>
                        <div className="details">
                            <a href="/StatsView">Voir plus</a>
                        </div>
                    </div>
                    <div className="description">
                        <h1 className="statsview"><span>S</span>TATS <span>V</span>IEW</h1>
                        <h2>League of Legends Statistiques</h2>
                        <p><span className="statsview"><span>S</span>TATS <span>V</span>IEW</span> est une application qui permet de voir les champions du moment en fonction du rôle choisi !</p>
                        <p>Il permet aussi de voir les statistiques de son compte, avec son historique et son classement !</p>
                    </div>
                </div>

                <div className="blog-card alt">
                    <div className="meta">
                        <div className="photo photo-minecraft"></div>
                        <div className="details">
                            <a href="/Minecraft">Voir plus</a>
                        </div>
                    </div>
                    <div className="description">
                        <h1 className="minecraft">Serveur Minecraft</h1>
                        <h2>sieltek.duckdns.org:25565</h2>
                        <p className="minecraft" style={{ fontSize: 19 }}>Rejoignez une nouvelle aventure minecraft sous la version 1.16.1 ! Créez, modifiez, détruisez, combattez vous contre d'autres joueurs, une seule règle : <span style={{ color: '#FE4F4F' }}>Have some fun !</span></p>
                    </div>
                </div>

                {/* <div className="m-5 p-0">
                    <h1>Serveur Discord <span className="dictatores">"Los Dictatores"</span> !</h1>
                    <Iframe url="https://discordapp.com/widget?id=360207498071769098&theme=dark"
                        width="100%" height="500"
                        frameBorder="0"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
                    </Iframe>
                </div> */}
            </Container>
        )
    }
}

export default Accueil