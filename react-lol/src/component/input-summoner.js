import React from 'react'
import { Media, Spinner } from 'react-bootstrap'
import MatchHisto from './match-histo'
import RankSummoner from './rank-summoner'

const styles = {
  sumName: {
    color: "#FE4F4F",
  },
  text: {
    color: "#EFEFEF",
  }
}

class InputSummoner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      summonerJson: {
        profileIconId: "0",
        messages: ""
      },
    }
  }

  componentDidMount() {
    this.setState({
      summonerJson: {
        profileIconId: "0"
      },
    })
    this.getSummonerName();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pseudo !== this.props.pseudo) {
      this.setState({
        summonerJson: {
          profileIconId: "0"
        },
      })
      this.getSummonerName();
    }
  }

  async getSummonerName() {
    if (this.props.pseudo) {
      let url = "http://localhost:4000/getSummoner/" + this.props.pseudo
      let res = await fetch(url, { method: "GET" })
      var summonerJson = await res.json()
      console.log(summonerJson)
      this.setState({
        summonerJson: summonerJson,
      })
    }
  }



  render() {
    if (this.state.summonerJson.id != null) {
      return (
        <div>
          <Media>
            <img width={100} height={100} alt="summoner-icon" className="icone-invocateur" anonymous='true' src={"https://opgg-static.akamaized.net/images/profile_icons/profileIcon" + this.state.summonerJson.profileIconId + ".jpg"} />
            <Media.Body className="m-3">
              <h1 className="summoner-name-title ml-4" >{this.state.summonerJson.name}</h1>
            </Media.Body>
          </Media>
          <RankSummoner summonerId={this.state.summonerJson.id} />
          <MatchHisto accountId={this.state.summonerJson.accountId} />
        </div>
      )
    } else if (this.state.summonerJson.status) {
      if (this.state.summonerJson.status.status_code === 429) {
        return (
          <div>
            <h3 style={styles.text} className="summoner-name-title ml-4 text-center" >Max request exceed</h3>
          </div>
        )
      }
      else if (this.state.summonerJson.status.status_code === 404) {
        return (
          <div>
            <h3 style={styles.text} className="summoner-name-title ml-4 text-center" >Summoner "<span style={styles.sumName}>{this.props.pseudo}</span>" doesn't exist...</h3>
          </div>
        )
      } else {
        return (
          <div>
            <h3 style={styles.text} className="summoner-name-title ml-4 text-center" >{this.state.summonerJson.status.message}</h3>
          </div>
        )
      }
    } else {
      return (
        <div>
          <Spinner animation="border" role="status" variant="secondary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    }
  }
}

export default InputSummoner