import React from "react";
import Board from "./Board";
import GameController from "../../utils/GameController.";
import Button from "../../components/Button";
import Message from "./Message";
import Cell from "./Cell";

interface Props {}

interface State {
  player1Moves: number[][];
  player2Moves: number[][];
  errorMessage: string;
  gameStatus: 0 | 1 | undefined;
  currentTurn?: 0 | 1;
  winningPlayer?: string;
  winningSegment: [][];
}

// @todo: convert to a functional component
class Game extends React.Component<Props, State> {
  private gameController: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      player1Moves: [],
      player2Moves: [],
      errorMessage: "",
      gameStatus: 0,
      winningSegment: [],
    };

    this.gameController = new GameController({ rows: 7, cols: 6 });
    this.handleColumnClick = this.handleColumnClick.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
  }

  handleResetGame() {
    const nextState = this.gameController.resetGame();
    this.setState({
      ...nextState,
    });
  }

  handleColumnClick(column: number) {
    // Start the game if not already
    if (this.state.gameStatus === 0) {
      this.gameController.resetGame();
    }
    const nextState = this.gameController.playTurn(column);
    this.setState({
      errorMessage: "",
      ...nextState,
    });
  }

  getPlayerCellHtml() {
    const { currentTurn } = this.state;
    return (
      <Cell
        className={currentTurn === 0 ? "player-1-cell" : "player-2-cell"}
        size={"sm"}
      />
    );
  }

  render() {
    const {
      errorMessage,
      player1Moves,
      player2Moves,
      gameStatus,
      winningPlayer,
      currentTurn,
      winningSegment,
    } = this.state;
    return (
      <div>
        <div className="mb-4">
          <Board
            player1Moves={player1Moves}
            player2Moves={player2Moves}
            rows={6}
            columns={7}
            onColumnClick={this.handleColumnClick}
            winningSegment={winningSegment}
          />
        </div>
        <div>
          <Message>
            {gameStatus === 1 && typeof currentTurn === "number" && (
              <div className="flex justify-center items-center gap-x-4">
                <div>Player {currentTurn + 1} turn</div>{" "}
                <div className="flex">{this.getPlayerCellHtml()}</div>
              </div>
            )}
            {typeof winningPlayer === "number" && (
              <div className="flex justify-center items-center gap-x-4">
                <div>!!! Player {winningPlayer + 1} wins !!! </div>
                <div className="flex">{this.getPlayerCellHtml()}</div>
              </div>
            )}
            {winningPlayer === "draw" && <div>!!! Draw !!!</div>}
          </Message>
        </div>

        <div className="my-4">{errorMessage}</div>
        <div>
          {gameStatus === 0 && (
            <Button onClick={this.handleResetGame}>Start New Game</Button>
          )}
          {gameStatus === 1 && (
            <Button onClick={this.handleResetGame}>Reset Game</Button>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
