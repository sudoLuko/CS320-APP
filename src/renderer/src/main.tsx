import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './components/Board'
import Column from './components/Column'
import Card from './components/Card'

//Constants for easier style prototyping
const COLUMN_BORDER: string = "3px solid #ccc";
const COLUMN_TEXT_COLOR: string = "black";
const COLUMN_FONT_WEIGHT: string = "bold";
const COLUMN_BACKGROUND_COLOR: string = "white";
const COLUMN_FONT_STYLE: string = "normal";

//single size to keep both button and column text the same size
const COLUMN_BUTTON_SIZE: string = "200%";
const COLUMN_FONT_SIZE: string = COLUMN_BUTTON_SIZE;
const BUTTON_FONT_SIZE: string = COLUMN_BUTTON_SIZE;

//single size to keep padding consistant
const COLUMN_PADDING: string = "10px";
const COLUMN_PADDING_LEFT: string = COLUMN_PADDING;
const COLUMN_PADDING_RIGHT: string = COLUMN_PADDING;
const COLUMN_PADDING_TOP: string = COLUMN_PADDING;
const COLUMN_PADDING_BOTTOM: string = COLUMN_PADDING;

//Cards


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
      <div key={id} style={{ border: COLUMN_BORDER, color: COLUMN_TEXT_COLOR, fontWeight: COLUMN_FONT_WEIGHT, backgroundColor: COLUMN_BACKGROUND_COLOR, fontSize: COLUMN_FONT_SIZE, paddingLeft: COLUMN_PADDING_LEFT, paddingRight: COLUMN_PADDING_RIGHT }}>
        My Column #{id}
      </div>
    ))

    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  }}>
        <button style= {{fontSize: BUTTON_FONT_SIZE}} onClick={this.addCol}>+</button>
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

