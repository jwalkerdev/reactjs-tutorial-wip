import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Code based on https://reactjs.org/tutorial/tutorial.html

// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

// While we’re cleaning up the code, we also changed onClick={() => props.onClick()} 
//   to just onClick={props.onClick}, as passing the function down is enough for our 
//   example. Note that onClick={props.onClick()} would not work because it would 
//   call props.onClick immediately instead of passing it down.
function Square(props) {
    return (
      // Could also use:  onClick={() => props.onClick()}
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i,"test")}
            />
        );
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {squares: Array(9).fill(null)},
            ],
            xIsNext: true,
        };
    }

    handleClick(i,j) {
        console.log(j)
        const squares = this.state.history[this.state.history.length - 1].squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: this.state.history.concat([{ 
                squares: squares 
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {

        const winner = calculateWinner(this.state.history[this.state.history.length-1].squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.state.history[this.state.history.length-1].squares}
                        onClick={(i,j) => this.handleClick(i,j)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

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
