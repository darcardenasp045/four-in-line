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


function App() {
  const [board, setBoard] = useState(Array(42).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  function checkWinner(board) {
    const ROWS = 6;
    const COLUMNS = 7;
    const WINNING_LENGTH = 4;
  
    const checkLine = (line) => {
      for (let i = 0; i <= line.length - WINNING_LENGTH; i++) {
        const slice = line.slice(i, i + WINNING_LENGTH);
        if (slice.every((cell) => cell !== null && cell === slice[0])) {
          return slice[0];
        }
      }
      return null;
    };
  
    // Función para obtener columnas
    const getColumns = () => {
      const columns = [];
      for (let col = 0; col < COLUMNS; col++) {
        const column = [];
        for (let row = 0; row < ROWS; row++) {
          column.push(board[row * COLUMNS + col]);
        }
        columns.push(column);
      }
      return columns;
    };
  
    // Convertir tablero a filas y columnas
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      const row = board.slice(i * COLUMNS, (i + 1) * COLUMNS);
      rows.push(row);
    }
  
    const columns = getColumns();
  
    // Verificar filas y columnas
    for (let i = 0; i < ROWS; i++) {
      const rowWinner = checkLine(rows[i]);
      if (rowWinner) {
        return rowWinner;
      }
  
      const colWinner = checkLine(columns[i]);
      if (colWinner) {
        return colWinner;
      }
    }
  
    // Verificar diagonales
    for (let i = 0; i <= ROWS - WINNING_LENGTH; i++) {
      for (let j = 0; j <= COLUMNS - WINNING_LENGTH; j++) {
        const diagonal = [];
        for (let k = 0; k < WINNING_LENGTH; k++) {
          diagonal.push(board[(i + k) * COLUMNS + j + k]);
        }
        const diagonalWinner = checkLine(diagonal);
        if (diagonalWinner) {
          return diagonalWinner;
        }
      }
    }
  
    return null; // No hay ganador
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
