import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './components/Board'
import Column from './components/Column'
import Card from './components/Card'
import './assets/main.css'

//Constants for easier style prototyping
const COLUMN_BORDER: string = "3px solid #ccc";
const COLUMN_WIDTH: string = "200px";
const COLUMN_HEIGHT: string = "100vh";
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

type MainViewProps = {
  board: Board
  selectedCol: Column
  selectedCard: Card
}

type DisplayColProp = { // render board state with columns
  board: Board
  boardList: Board[]
  currI: number
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
    this.board = props.board

    this.state = {
      board: this.board,
      boardList: [],
      currI: 0,
    }
  }

  addBoard = () => {
    const boardLength = this.state.boardList.length
    const newBoard = new Board("" + boardLength, [], this.board.boards, boardLength)
    
    this.setState(({
      boardList: this.board.addBoard(newBoard).boards,
      currI: newBoard.board_i,
      board: newBoard,
    }))
  }

  addCol = () => {
    const colLength = this.state.board.columns.length
    const newCol = new Column("" + colLength, 0, [])

    const currBoard = this.state.boardList.slice()
    const updatedBoard = currBoard[this.state.currI].addColumn(newCol)
    currBoard[this.state.currI] = updatedBoard

    this.setState({
      board: this.board.addColumn(newCol),
      boardList: this.state.boardList.slice(),
      currI: this.state.currI
    })
  }

  createCard = (colID: number) => {
    // board
    const boardArr = this.state.boardList.slice()
    const currBoard = boardArr[this.state.currI]
  
    // each column
    const currCol = currBoard.columns.slice()
    
    // select and add card
    const selectCol = currCol[colID]
    const cardLength = selectCol.cards.length
    const newCard = new Card(cardLength, "", "")
  
    const newColumn = selectCol.addCard(newCard)
    currCol[colID] = newColumn
  
    const newBoard = new Board(
      currBoard.board_name,
      currCol,
      currBoard.boards,
      currBoard.board_i
    )
  
    currBoard[this.state.currI] = newBoard
  
    this.setState({
      board: newBoard,
      boardList: boardArr,
      currI: this.state.currI
    })
  }
  
  selected(i: number): void {
    const selected = this.state.boardList[i]
            
      this.setState({
        currI: i,
        board: selected,
      })
  }

  render() {
    // card JSX
    const card = this.state.board.columns.map((col) => (
      col.cards.map((card) => (
        <div className="cardBlock" key={card.card_name}>
          {/** METHOD TO NAME CARD */}
          {card.card_name}
        </div>
      ))
    ))

    // convert to JSX
    const coolCol = this.state.board.columns.map((col) => (
      <div className="tabRow" key={col.colID}>
        <div style={{ border: COLUMN_BORDER, width: COLUMN_WIDTH, height: COLUMN_HEIGHT, color: COLUMN_TEXT_COLOR, fontWeight: COLUMN_FONT_WEIGHT, backgroundColor: COLUMN_BACKGROUND_COLOR, fontSize: COLUMN_FONT_SIZE, paddingLeft: COLUMN_PADDING_LEFT, paddingRight: COLUMN_PADDING_RIGHT, paddingTop: COLUMN_PADDING_TOP, paddingBottom: COLUMN_PADDING_BOTTOM }}>
          {/** METHOD TO NAME COLUMN */}
          {col.colID}
          <button style={{ fontSize: "100%", marginBottom: "8px" }} onClick={() => this.createCard(col.colID)} type="button">+</button>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }} >
            {card}
          </div>
        </div>
      </div>
    ))

    const boardTabs = this.state.boardList.map((b, i) => (
      <button key={b.board_i} className="cardBlock" onClick={() => this.selected(i)} type="button">
        { b.board_i }
        {/** METHOD TO NAME BOARD */}
      </button>
    ))

    return (
      <div className="mainview">

        <div className="rightSide">
          <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={this.addBoard}>+</button>
    
          <div className="tabsView">
            {boardTabs}
          </div>
          
        </div>
    
        <div className="leftSide">
          <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={this.addCol}>+</button>
          <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
            {this.state.board.board_name}
          </div>
          <div style={{display: "flex"}}>
            {coolCol}
          </div>
        </div>

      </div>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainView board={new Board("board", [], [], 0)} selectedCol={new Column("mainColumn", 0, [])} selectedCard={new Card(0, "", "starterCard")}/>
  </React.StrictMode>
)
