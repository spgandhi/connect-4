import React from "react";
import Board from "./Board";
import GameController from "../../utils/GameController.";

interface Props {}

interface State {
  player1Moves: number[][];
  player2Moves: number[][];
  errorMessage: string;
}

class Game extends React.Component<Props, State> {
  private gameController: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      player1Moves: [],
      player2Moves: [],
      errorMessage: "",
    };

    this.gameController = new GameController({ rows: 7, cols: 6 });
    this.gameController.startGame();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(column: number) {
    const nextState = this.gameController.playTurn(column);
    this.setState({
      ...nextState,
    });
  }

  render() {
    const { errorMessage, player1Moves, player2Moves } = this.state;
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
        {errorMessage}
      </div>
    );
  }
}

export default Game;
