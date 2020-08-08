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
        } else if (path === "/") {
            return (
                <div className="nav-bar">
                    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                        <Navbar.Brand href="/">SieLteK</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto"></Nav>
                            <Nav.Link href="/StatsView">Stats View</Nav.Link>
                            <Nav.Link href="/Minecraft">Minecraft</Nav.Link>
                            <Nav.Link href="/CV">CV</Nav.Link>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
    }
}

export default NavBar