function Team(props){
    let shotPercentageDiv;

    if (props.stats.shots) {
      const shotPercentage = Math.round(
        (props.stats.score / props.stats.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{props.name}</h2>

        <div className="ID">
          <img src={props.logo} alt={props.name} />

          <div>
            <strong>Shots:</strong> {props.stats.shots}
          </div>

          <div>
            <strong>Score:</strong> {props.stats.score}
          </div>

          {shotPercentageDiv}
          <button onClick={props.shotHandler}>Shoot!</button>
        </div>
      </div>
    )
  }

class Game extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }
    this.shotSound = new Audio("./assets/sounds/Swing.wav");
    this.scoreSound = new Audio("./assets/sounds/Swish.wav");
  }

  shotHandler = (team) => {
    const teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score;

    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      [teamStatsKey] : {
      shots: state[teamStatsKey].shots + 1,
      score
      }
    }))
  }

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: this.state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      },
    }))
  }

  render() {
  return (
  <div className="Game">
    <h1>Welcome to {this.props.venue}</h1>
      <div className="stats">
        <Team name={this.props.visitingTeam.name} logo={this.props.visitingTeam.logoSrc} stats= {this.state.visitingTeamStats} shotHandler={() => this.shotHandler('visiting')}/>

        <div className="versus">
          <h1>VS</h1>
          <div>
            <strong>Reset:</strong> {this.state.resetCount}
            <button onClick={this.resetGame}>Reset Game</button>
          </div>
        </div>

        <Team name={this.props.homeTeam.name} logo={this.props.homeTeam.logoSrc} stats= {this.state.homeTeamStats} shotHandler={() => this.shotHandler('home')}/>
      </div>
    </div>
  )
  }
}
// Deafault App component that all other compents are rendered through
function App(props) {
  const birds = {
    name: "Birds",
    logoSrc: "./assets/images/birds.jpeg"
  }

  const lions = {
    name: "Birds",
    logoSrc: "./assets/images/lions.jpg"
  }

  const dolphins = {
    name: "Dolphins",
    logoSrc: "./assets/images/dolphins.jpg"
  }

  const panthers = {
    name: "Panthers",
    logoSrc: "./assets/images/panthers.png"
  }
  return (
    <div className="App">
   <Game venue="Union 525 Gem" homeTeam={lions} visitingTeam={birds}/>
   <Game venue="Sherdian Arena" homeTeam={dolphins} visitingTeam={panthers} />

   </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
