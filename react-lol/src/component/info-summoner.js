import React from 'react'

class InfoSum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            val: []
        }
    }

    componentDidMount() {
        this.setState({
            val: []
        })
        this.getInfo()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.summonerId !== this.props.summonerId) {
            this.setState({
                val: []
            })
            this.getInfo();
        }
    }

    getInfo() {
        var info = this.props.sum
        var val = []
        if (info.freshBlood === true) {
            val.push("Fresh Blood")
        }
        if (info.veteran === true) {
            val.push("Veteran")
        }
        if (info.hotStreak === true) {
            val.push("Hot Streak")
        }
        if (info.inactive === true) {
            val.push("Inactive")
        }
        this.setState({
            val: val
        })
    }

    render() {
        return (
            <div className="badge text-center font-weight-bold text-light" style={{ background: "#FE4F4F" }}>
                {this.state.val.map((item, i) =>
                    <span key={i} className="badge">{item}</span>
                )}
            </div>
        )
    }
}

export default InfoSum