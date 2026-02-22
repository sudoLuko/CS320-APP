import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './components/Board'
import Column from './components/Column'
import Card from './components/Card'

type MainViewProps = {
  board: Board
  selectedCol: Column
  selectedCard: Card
}

type DisplayColProp = { // array for rendering columns
  cols: number[]
}

class MainView extends React.Component<MainViewProps, DisplayColProp> {
  board: Board
  selectedCol: Column
  selectedCard: Card

  constructor(props: MainViewProps) {
    super(props)
    this.board = props.board
    this.selectedCol = props.selectedCol
    this.selectedCard = props.selectedCard
    this.state = {
      cols: [] // start with 1 column
    }
  }

  createBoard(b: Board, c: Column): Board {
    return new Board(b.board_name, [c])
  }

  createCard(): void {}

  addColumn(c: Column): void {
    this.board = this.createBoard(this.board, c)
  }


  addCol = () => {
    const currList = this.state.cols
    const count = currList.length + 1

    // setup
    const newList = currList.slice() 
    newList.push(count) // add col

    // render the new list
    this.setState({
      cols: newList
    })
  }

  render() {
    // convert to JSX
    const coolCol = this.state.cols.map((id) => (
      <div key={id} style={{ border: "1px solid #ccc"}}>
        My Column #{id}
      </div>
    ))

    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <button onClick={this.addCol}>+</button>
        {coolCol}
      </div>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainView board={new Board("board", [])} selectedCol={new Column("mainColumn", 0, [])} selectedCard={new Card(0, "", "starterCard")}/>
  </React.StrictMode>
)