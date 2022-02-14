import { existsIn2DArray } from "./utils";

export default class GameController {

  private gameStatus: 0 | 1;
  private currentTurn: 0 | 1 | null;
  private lastMove: [number, number] | null;
  private maxRows: number;
  private maxCols: number;

  public player1Moves: number[][];
  public player2Moves: number[][];
  public winningPlayer: 0 | 1 | 'draw' | null;
  public winningSegment: string[][];


  constructor({rows, cols}: any) {
    this.gameStatus = 0;
    this.currentTurn = null;
    this.player1Moves = [];
    this.player2Moves = [];
    this.lastMove = null;
    this.winningPlayer = null;
    this.winningSegment = [];
    this.maxRows = rows;
    this.maxCols = cols;
  }

  // Getters
  getGameStatus() {
    return this.gameStatus;
  }

  getGameState() { 
    return {
      gameStatus: this.gameStatus,
      currentTurn: this.currentTurn,
      lastMove: this.lastMove,
      winningPlayer: this.winningPlayer,
      winningSegment: this.winningSegment,
      player1Moves: this.player1Moves,
      player2Moves: this.player2Moves
    }
  }

  // Find the next available cell in a given column
  private getFirstEmptyCellInColumn(column: number) {
    return this.player1Moves.filter(item => item[1] === column).length + this.player2Moves.filter(item => item[1] === column).length;
  }


  // Tests if the player who played the turn last has the given segment in their moves
  private isWinningSegment(segment: any) {

    /**
     * Logic
     * 1. Check Segment length. It should be exactly 4 for a winning condition
     * 2. Check the player who played the last turn
     * 3. Check if all the segment items should exist in the player's moves
     * 
     */

    if (segment.length !== 4) return false;
    const currentPlayerItems = this.currentTurn === 0 ? this.player1Moves : this.player2Moves;
    return segment.every((item: any) => {
      const cellName = item;
      return existsIn2DArray(currentPlayerItems, cellName);
    })

  }

  // Test all possible horizontal segments for a win that includes the last move
  private checkHorizontalWin({focalRow, minXCord, maxXCord}: any) {
    let isWinner = false;
    for (let row = focalRow, col = minXCord; col <= maxXCord; col++) {
      const segment = [[row, col], [row, col+1], [row, col+2], [row, col+3]];
      isWinner = this.isWinningSegment(segment);
      if(isWinner) return {segment};
    }    
    return false;
  }

  // Test all possible vertical segments for a win that includes the last move
  private checkVerticalWin({focalCol, minYCord, maxYCord}: any) {
    let isWinner = false;
    for (let col = focalCol, row = minYCord; row <= maxYCord; row++) {
      const segment = [[row, col], [row+1, col], [row+2, col], [row+3, col]];
      isWinner = this.isWinningSegment(segment);
      if(isWinner) return {segment};
    }
    return false;
  }

  // Test all possible diagonal segments for a win that includes the last move
  private checkForwardSlashSegments({ focalRow, focalCol, minRow, minCol, maxRow, maxCol }: any) {
    let isWinner = false;

    const startForwardSlash = (row: any, col: any) => {
      while(row > minRow && col > minCol) { row--; col--; }
      return [row, col]
    }
    for (let [row, col] = startForwardSlash(focalRow, focalCol); row <= maxRow && col <= maxCol; row++, col++) {
      const segment = [[row, col], [row+1, col+1], [row+2, col+2], [row+3, col+3]];
      isWinner = this.isWinningSegment(segment);
      if(isWinner) return {segment};
    }
    return false;
  }

  // Test all possible diagonal segments for a win that includes the last move
  private checkBackwardSlashSegments({ focalRow, focalCol, minRow, minCol, maxRow, maxCol }: any) {
    let isWinner = false;

    const startBackwardSlash = (row: any, col: any) => {
      while(row < maxRow && col > minCol) { row++; col--; }
      return [row, col]
    }
    for (let [row, col] = startBackwardSlash(focalRow, focalCol); row >= minRow && col <= maxCol; row--, col++) {
      const  segment = [[row, col], [row-1, col+1], [row-2, col+2], [row-3, col+3]];
      isWinner = this.isWinningSegment(segment);
      if(isWinner) return {segment};
    }
    return false;
  }

  private isGameOver() {

     /* Logic
      1. Find the focal point i.e. the cell where the last move was made  
      2. Find the min and max coordinates that can give a winning conditions with Focal Point included
      3. Given the focal point, min ad max coordinates, check all possible horizontal, vertical and diagonal segments for win conditions
    */

    // Last move should be avaialble to check winning conditions
    if(!this.lastMove) return;

   
    const focalRow = this.lastMove[0];
    const focalCol = this.lastMove[1];

    const minXCord = Math.max(focalCol - 3, 0);
    const maxXCord = Math.min(focalCol + 3, 6);

    const minYCord = Math.max(focalRow - 3, 0);
    const maxYCord = Math.min(focalRow + 3, 6);

    return this.checkHorizontalWin({focalRow, minXCord, maxXCord}) ||
    this.checkVerticalWin({focalCol, minYCord, maxYCord}) ||
    this.checkForwardSlashSegments({ focalRow, focalCol, minRow: minYCord, minCol: minXCord, maxRow: maxYCord, maxCol: maxXCord }) ||
    this.checkBackwardSlashSegments({ focalRow, focalCol, minRow: minYCord, minCol: minXCord, maxRow: maxYCord, maxCol: maxXCord })
  }

  resetGame() {
    this.player1Moves = [];
    this.player2Moves = [];
    this.gameStatus = 1;
    this.currentTurn = 0;
    this.winningPlayer = null;
    this.winningSegment = [];

    return this.getGameState();
  }

  playTurn(column: number) {
    
    if (this.gameStatus === 0) return;

    const row = this.getFirstEmptyCellInColumn(column);

    if(row  >= this.maxRows - 1) return {
      error: true,
      errorMessage: 'Column is full'
    };

    if(this.currentTurn === 0) {
      this.player1Moves.push([row, column]);
    } else {
      this.player2Moves.push([row, column]);
    }

    this.lastMove = [row, column];
    const gameResult = this.isGameOver();

    if(gameResult && gameResult.segment) {
      this.gameStatus = 0;
      this.winningPlayer = this.currentTurn;
      this.winningSegment = gameResult.segment;
    } else {
      this.currentTurn = this.currentTurn === 0 ? 1 : 0;
    }

    // Game draw situation
    if(!this.winningPlayer && this.player1Moves.length + this.player2Moves.length === this.maxRows * this.maxCols) {
      this.gameStatus = 0;
      this.winningPlayer = 'draw'
    }

    return this.getGameState();
  }
}