import React from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchSummoner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputSummoner: '',
            redirect: true
        }
    }

    handleInput(event) {
        this.setState({ inputSummoner: event.target.value })
    }

    renderRedirect() {
        const { redirect } = this.state
        if (redirect && this.state.inputSummoner) {
            var path = '/summoner/' + this.state.inputSummoner
            this.props.history.push(path);
        }
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            this.renderRedirect()
        }
    }

    render() {
        return (
            <InputGroup>
                <FormControl placeholder="Search Summoner" type="text" onChange={(event) => this.handleInput(event)} onKeyPress={(event) => this.handleEnter(event)}></FormControl>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => this.renderRedirect()}>
                    <FontAwesomeIcon icon={faSearch} />          
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

export default withRouter(SearchSummoner)