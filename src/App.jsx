// i am going to do a conect four 
import { useState } from 'react'
import confetti from "canvas-confetti"

const TURNS = {
  X: "🪙",
  O: '⭕',
}



//vamos a crear un componente que se llama square, luego de crearlo vamos a ponerle props llamdas chisldren, updateBoard, isSelected, index, estas props son las que vamos a usar en el componente square, 
// eslint-disable-next-line react/prop-types
const Square = ({children, updateBoard, isSelected,  index}) => {
  //luego se crea un consnt llamada className, en la cual tenemos una ternaria donde preguntamos si es esta seleccionado o no, despues se crea un handleClick en el cual ponemos una funcion llamada 
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }
  return (
      <div className="square" onClick={handleClick}>
      <span className={className}>
        {children}
      </span>
    </div>
  )
}

const winnerCombos = [
  
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40],
    [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23],
    [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26],
    [6, 13, 20, 27], [3, 9, 15, 21], [4, 10, 16, 22],
    [5, 11, 17, 23], [6, 12, 18, 24], [10, 16, 22, 28],
    [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40],
    [17, 25, 33, 41], [6, 12, 18, 24], [5, 11, 17, 23],
    [4, 10, 16, 22], [3, 9, 15, 21], [13, 19, 25, 31],
    [12, 18, 24, 30], [11, 17, 23, 29], [10, 16, 22, 28],
    [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23],
    [6, 12, 18, 24], [10, 16, 22, 28], [11, 17, 23, 29],
    [12, 18, 24, 30], [13, 19, 25, 31], [17, 24, 31, 38],
    [16, 24, 32, 40], [15, 23, 31, 39], [14, 22, 30, 38],
    [27, 21, 15, 9], [26, 20, 14, 8], [25, 19, 13, 7],
    [24, 18, 12, 6], [34, 28, 22, 16], [33, 27, 21, 15],
    [32, 26, 20, 14], [31, 25, 19, 13],[0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27],
  [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], [7, 14, 21, 28],
  [2, 9, 16, 23], [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29],
  [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30],
  [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
  [5, 12, 19, 26], [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32],
  [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33],
  [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34],
  [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35],
  [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35], [15, 22, 29, 36],
  [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35], [15, 22, 29, 36], [16, 23, 30, 37],
  [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35], [15, 22, 29, 36], [16, 23, 30, 37], [17, 24, 31, 38],
  [14, 21, 28, 35], [15, 22, 29, 36], [16, 23, 30, 37], [17, 24, 31, 38], [18, 25, 32, 39], [19, 26, 33, 40], [20, 27, 34, 41],[14, 22, 30, 38],[15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],[18, 26, 34, 42],[19, 27, 35, 43],[20, 28, 36, 44],[21, 29, 37, 45],[22, 30, 38, 46],[23, 31, 39, 47],[24, 32, 40, 48],[25, 33, 41, 49],[26, 34, 42, 50],[27, 35, 43, 51],[28, 36, 44, 52],[29, 37, 45, 53],[30, 38, 46, 54],[31, 39, 47, 55],[32, 40, 48, 56],[33, 41, 49, 57],[34, 42, 50, 58],[35, 43, 51, 59],[36, 44, 52, 60],[37, 45, 53, 61],[38, 46, 54, 62],[39, 47, 55, 63],[40, 48, 56, 64],[41, 49, 57, 65],[42, 50, 58, 66],[43, 51, 59, 67],[44, 52, 60, 68],[45, 53, 61, 69],[46, 54, 62, 70],[47, 55, 63, 71],[48, 56, 64, 72],[49, 57, 65, 73],[50, 58, 66, 74],[51, 59, 67, 75],[52, 60, 68, 76],[53, 61, 69, 77],[54, 62, 70, 78],[55, 63, 71, 79],[56, 64, 72, 80],[57, 65, 73, 81],[58, 66, 74, 82],[59, 67, 75, 83],[60, 68, 76, 84]
  
]






function App() {
  const [board, setBoard] = useState(Array(42).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for(const combos of winnerCombos){
      const [a,b,c,d] = combos
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]&&
        boardToCheck[a] === boardToCheck[d]
        
        ){
          return boardToCheck[a]
        }

  }
  return null
  
}
const resetGame =()=>{
  setBoard(Array(42).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

const checkEndGame = (newBoard) => {
  return newBoard.every((item) => item !== null)

}
const updateBoard = (index) => {

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()+

      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }


  }
  return (
    <main className="board">
      <h1>Four in Line</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map(( _ ,index)=>{
            return (
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard} 
              >
                {board[index]}
                </Square>
            )
          })
        }

      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner !=  null && (
          <section className= "winner">
            <div className = "text">
              <h2>
                {
                  winner === false
                  ?'Empate'
                  : 'Gano'
                }
              </h2>
              
              <header className= "win">
                {
                  winner && <Square>
                    {winner}
                  </Square>
                }
              </header>

              <footer>
                <button onClick={resetGame} >
                  Empezar de nuevo
                </button>
              </footer>


            </div>
          </section>

        )
      }
    </main>
  )
}

export default App
