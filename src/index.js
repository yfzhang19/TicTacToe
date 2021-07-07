import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


/*
class Square extends React.Component {
    //store state inside the value in square
   
    render() {
      return (
        //clicked -> call onClick -> 
        <button 
        className="square" 
        onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
*/
  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    
    handleClick(i) {
        //creates a copy of the squares, changes the copy
        const squares = this.state.squares.slice();
        //if won, ignore
        //squares[i]???????????]
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        //change variable based on boolean
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            //what does the lien under do???????
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
      }

    renderSquare(i) {
        //pass function from board to square
        //onClick alerts you that the function is clicked
      return(
        <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      const history = this.state.history;
      const current = history[history.length-1];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step,move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
        );
      });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }
    render() {
        const history = this.state.history;
        
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  //calc winner and returns the winner, also calc in render, squares is an array
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  