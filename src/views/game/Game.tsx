import React from "react";
import Board from "./Board";
import GameController from "../../utils/GameController.";
import Button from "../../components/Button";

interface Props {}

interface State {
  player1Moves: number[][];
  player2Moves: number[][];
  errorMessage: string;
  gameStatus: 0 | 1 | undefined;
  winningPlayer?: string;
}

class Game extends React.Component<Props, State> {
  private gameController: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      player1Moves: [],
      player2Moves: [],
      errorMessage: "",
      gameStatus: 0,
    };

    this.gameController = new GameController({ rows: 7, cols: 6 });
    this.handleClick = this.handleClick.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
  }

  handleStartGame() {
    this.gameController.startGame();
    this.setState({
      gameStatus: this.gameController.getGameStatus(),
    });
  }

  handleResetGame() {
    this.setState({
      player1Moves: [],
      player2Moves: [],
    });
    this.gameController.startGame();
  }

  handleClick(column: number) {
    const nextState = this.gameController.playTurn(column);
    this.setState({
      ...nextState,
    });
  }

  render() {
    const {
      errorMessage,
      player1Moves,
      player2Moves,
      gameStatus,
      winningPlayer,
    } = this.state;
    return (
      <div>
        {JSON.stringify(this.state)}
        <Board
          player1Moves={player1Moves}
          player2Moves={player2Moves}
          rows={6}
          columns={7}
          onCellClick={this.handleClick}
        />
        {typeof winningPlayer === "number" &&
          "Winner is Player " + (winningPlayer + 1)}

        {gameStatus === 0 && (
          <Button onClick={this.handleStartGame}>Start New Game</Button>
        )}

        {gameStatus === 1 && (
          <Button onClick={this.handleResetGame}>Reset Game</Button>
        )}
        {errorMessage}
      </div>
    );
  }
}

export default Game;
