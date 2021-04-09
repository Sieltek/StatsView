import React from 'react'

class MatchInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    // componentDidMount() {
    //     this.getSummonerMatchInfo()
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.accountId !== this.props.accountId) {
    //     }
    // }



    render() {
        if (this.state.resultGame === true) {
            return (
                <div>
                    WIN
                </div>
            )
        } else if (this.state.resultGame === false) {
            return (
                <div>
                    LOSE
                </div>
            )
        } else {
            return null
        }
    }
}

export default MatchInfo