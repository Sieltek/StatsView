import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import SearchSummoner from './search-summoner'

class NavBar extends React.Component {

    render() {
        var path = this.props.location.pathname
        if (path.startsWith("/StatsView")) {
            return (
                <div className="nav-bar">
                    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                        <Navbar.Brand href="/StatsView"><img src={require("../img/eye-logo.png")} alt="STATS VIEW" width="230px" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <div className="form-inline">
                                <SearchSummoner />
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
            // } else if (path === "/") {
        } else {
            return (
                <div className="nav-bar">
                    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                        <Navbar.Brand href="/" ><span className="accueil">Accueil</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto"></Nav>
                            <Nav.Link href="/StatsView" className="hvr-float-shadow"><img src={require("../img/eye-logo.png")} alt="STATS VIEW" width="160px" /></Nav.Link>
                            <Nav.Link href="/Minecraft" className="hvr-float-shadow"><img src={require("../img/minecraft.png")} alt="MINECRAFT" width="160px" /></Nav.Link>
                            <Nav.Link href="/CV" className="hvr-float-shadow"><img src={require("../img/cv.png")} alt="CV" width="30px" /></Nav.Link>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
    }
}

export default NavBar