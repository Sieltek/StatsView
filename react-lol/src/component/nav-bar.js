import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import SearchSummoner from './search-summoner'

class NavBar extends React.Component {

    render() {
        return (
            <div className="nav-bar">
                <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                    <Navbar.Brand href="/"><img src={require("../img/eye-logo.png")} alt="STATS VIEW" width="250px" /></Navbar.Brand>
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
    }
}

export default NavBar