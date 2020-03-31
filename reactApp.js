class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0
    };

    this.shotSound = new Audio("./assets/sounds/Swing.wav");
    this.scoreSound = new Audio("./assets/sounds/Swish.wav");
  }

  shothandler = () => {
    let score = this.state.score;

    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }));
  };
  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{this.props.name}</h2>
        <div className="ID">
          <img src={this.props.logo} alt={this.props.name} />
          <div>
            <strong>Shots:</strong> {this.state.shots}
          </div>
          <div className="ScoreBoard">
            <strong>Score:</strong> {this.state.score}
          </div>
          {shotPercentageDiv}
          <button onClick={this.shothandler}>Shoot!</button>
        </div>
      </div>
    );
  }
}

function Game(props) {
  return (
  <div className="Game">
    <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team name={props.visitingTeam.name} logo={props.visitingTeam.logoSrc} />

        <div className="versus">
          <h1>VS</h1>
        </div>

        <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
      </div>
    </div>
  )
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
