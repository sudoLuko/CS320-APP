import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './components/Board'
import Column from './components/Column'
import Card from './components/Card'

import './assets/main.css';
import { createBoard, getBoardByID, getBoardsByUser, updateBoard, deleteBoard } from './ipc'
import { createColumn, getColumnsByBoard, updateColumn, deleteColumn } from './ipc'
import { createCard, getCardsByColumn, updateCard, deleteCard } from './ipc'

//Constants for easier style prototyping
const COLUMN_BORDER: string = "1px solid #d6d6d6";
const COLUMN_WIDTH: string = "240px";
const COLUMN_HEIGHT: string = "100vh";
const COLUMN_TEXT_COLOR: string = "black";
const COLUMN_FONT_WEIGHT: string = "bold";
const COLUMN_BACKGROUND_COLOR: string = "white";
const COLUMN_FONT_STYLE: string = "normal";

//single size to keep both button and column text the same size
const COLUMN_BUTTON_SIZE: string = "150%";
const COLUMN_FONT_SIZE: string = COLUMN_BUTTON_SIZE;
const BUTTON_FONT_SIZE: string = COLUMN_BUTTON_SIZE;

//single size to keep padding consistant
const COLUMN_PADDING: string = "12px";
const COLUMN_PADDING_LEFT: string = COLUMN_PADDING;
const COLUMN_PADDING_RIGHT: string = COLUMN_PADDING;
const COLUMN_PADDING_TOP: string = COLUMN_PADDING;
const COLUMN_PADDING_BOTTOM: string = COLUMN_PADDING;

const USER_ID = 1

type MainViewProps = {
  board: Board
  selectedCol: Column
  selectedCard: Card
}

type DisplayColProp = { // render board state with columns
  board: Board
  boardList: Board[]
  currI: number
  colID: number
  cardID: number
  debugMsg: string
  logInState: string
  successMsg: string
  username: string
  email: string
  password: string
  demo1: number
  demo2: number
  demoBoardID: number
  demoColumnID: number
  demoCardID: number
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
      colID: 0,
      cardID: 0,
      debugMsg: '',
      logInState: '',
      successMsg: '',
      username: '',
      email: '',
      password: '',
      demo1: 0,
      demo2: 0,
      demoBoardID: -1,
      demoColumnID: -1,
      demoCardID: -1
    }
  }

  addBoard = () => {
    const boardLength = this.state.boardList.length
    const newBoard = new Board("" + boardLength, [], this.board.boards, boardLength)
    
    this.setState(({
      boardList: this.board.addBoard(newBoard).boards,
      currI: newBoard.board_i,
      board: newBoard,
      debugMsg: "added board " + newBoard.board_name
    }))
  }

  addCol = () => {
    if (this.state.boardList.length == 0) {
      this.setState({
        debugMsg: "no board to add column to"
      })
    } else {
      
      const colLength = this.state.board.columns.length
      const newCol = new Column("" + colLength, colLength, [])

      const currBoard = this.state.boardList.slice()
      const updatedBoard = currBoard[this.state.currI].addColumn(newCol)
      currBoard[this.state.currI] = updatedBoard

      this.setState({
        board: updatedBoard,
        boardList: currBoard,
        currI: this.state.currI,
        debugMsg: "added column " + newCol.column_name
      })
    }
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
    const newCard = new Card(cardLength,cardLength, "", "")
  
    const newColumn = selectCol.addCard(newCard)
    currCol[colID] = newColumn
  
    const newBoard = new Board(
      currBoard.board_name,
      currCol,
      currBoard.boards,
      currBoard.board_i
    )
    boardArr[this.state.currI] = newBoard
  
    this.setState({
      board: newBoard,
      boardList: boardArr,
      currI: this.state.currI,
      debugMsg: "added card " + newCard.card_id
    })
  }

  remCard = (colID: number, cardID: number) => {
    const b = this.state.boardList.slice()
    const currB = b[this.state.currI]
    
    const c = currB.columns.slice()
    const currC = c[colID]
    
    // removes
    currC.cards.splice(cardID, 1)
    c[colID] = currC

    // updates state
    const newB = new Board(currB.board_name, c, currB.boards, currB.board_i)
    b[this.state.currI] = newB

    this.setState({
      board: newB,
      boardList: b,
      currI: this.state.currI,
      debugMsg: "removed card " + this.state.cardID 
    })
  }

  dragStart = (e: any, card_id: number, colID: number) => {
    e.dataTransfer.setData("card_id", card_id)
    e.dataTransfer.setData("colID", colID)
    // add card to column and update state
    this.dragCard(colID, card_id)
    this.setState({ debugMsg: "card " + card_id + " from column " + colID })
  }

  dragOver = (e: any) => {
    e.preventDefault()
  }

  dropAddCard = (toCol: number) => {
    // drop into
    const b = this.state.boardList.slice()
    const currB = b[this.state.currI]
    
    const c = currB.columns.slice()
    const currC = c[toCol]
    
    // add
    const cardID = currC.cards.length + 1
    currC.cards.push(new Card(cardID, cardID, "dropped", "!"))
    
    // update col
    c[toCol] = currC

    // update board
    const newB = new Board(currB.board_name, c, currB.boards, currB.board_i)
    b[this.state.currI] = newB
    
    this.setState({
      board: newB,
      boardList: b,
      currI: this.state.currI,
      debugMsg: "card " + currC.cards[cardID].card_id + " added to column " + currC.column_name
    })
  }  

  drop = (colID: number) => {
    // remove card from column and update state
    this.dropRemCard()
    this.dropAddCard(colID)
  }
 
  dragCard = (colID: number, cardID: number) => {
    // retrieve ids
    this.setState({
      colID: colID,
      cardID: cardID
    })
  }

  // add card to the column
  dropRemCard = () => {
    const b = this.state.boardList.slice()
    const currB = b[this.state.currI]
    
    const c = currB.columns.slice()
    const currC = c[this.state.colID]
    
    // removes
    currC.cards.splice(this.state.cardID, 1)
    c[this.state.colID] = currC

    // updates state
    const newB = new Board(currB.board_name, c, currB.boards, currB.board_i)
    b[this.state.currI] = newB

    this.setState({
      board: newB,
      boardList: b,
      currI: this.state.currI,
    })
  }
  
  export = () => {
    const demo = {
      boardID: this.state.demoBoardID,
      columnID: this.state.demoColumnID,
      cardID: this.state.demoCardID
    }
  
    this.setState({
      debugMsg: "exporting...",
      successMsg: JSON.stringify(demo)
    })
  }

  login = () => {
    this.setState({
      board: this.state.board,
      boardList: this.state.boardList,
      currI: this.state.currI,
      logInState: "login",
      debugMsg: "logging in..." + this.state.email + this.state.password
    })
  }

  signUp = () => {
    this.setState({
      board: this.state.board,
      boardList: this.state.boardList,
      currI: this.state.currI,
      logInState: "signUp",
      debugMsg: "signing up..." + this.state.email + this.state.password + this.state.username
    })
  }

  sbmtCredentials = () => {
    if (this.state.logInState == "login") {
      if (this.state.demo1 == 0) {
        this.setState({
          successMsg: this.state.username,
          demo1: 1,
          debugMsg: "logged in!" + this.state.username + this.state.email + this.state.password
        })
      } else {
        this.setState({
          successMsg: this.state.username,
          demo1: 0,
          debugMsg: "incorrect email or password!" + this.state.username + this.state.email + this.state.password
        })
      }
    }
    if (this.state.logInState == "signUp") {
      if (this.state.demo2 == 0) {
        this.setState({
          successMsg: this.state.username,
          demo2: 1,
          debugMsg: "signed up!" + this.state.username + this.state.email + this.state.password
        }) 
      } else {
        this.setState({
          successMsg: this.state.username,
          demo2: 0,
          debugMsg: "account already exists!" + this.state.username + this.state.email + this.state.password
        })
      }
    }
  }
  
  selected = (i: number) => {
    const selected = this.state.boardList[i]
            
    this.setState({
      currI: i,
      board: selected,
      debugMsg: "selected board " + selected.board_name
    })
  }

  dbBoard = async () => {
    const b = await createBoard("demoBoard", "demo", USER_ID) // use your user id here
    this.setState({
      demoBoardID: b.id,
      debugMsg: "board=" + b.id
    })
  }

  dbColumn = async () => {
    if (this.state.demoBoardID === -1) return
    const c = await createColumn("demoCol", 1, this.state.demoBoardID)
    this.setState({
      demoColumnID: c.id,
      debugMsg: "column=" + c.id
    })
  }

  dbCard = async () => {
    if (this.state.demoColumnID === -1) return
    const c = await createCard("demoCard", "", 1, this.state.demoColumnID)
    this.setState({
      demoCardID: c.id,
      debugMsg: "card=" + c.id
    })
  }

  render() {

    // convert to JSX
    const coolCol = this.state.board.columns.map((col) => (
      <div className="tabRow" key={col.colID}>
        <input type="text" placeholder = 'name your column'style = {{ width: "100%" }}></input>
        <div onDragOver={(e) => this.dragOver(e)} onDrop={() => this.drop(col.colID)} style={{ border: COLUMN_BORDER, width: COLUMN_WIDTH, height: COLUMN_HEIGHT, color: COLUMN_TEXT_COLOR, fontWeight: COLUMN_FONT_WEIGHT, backgroundColor: COLUMN_BACKGROUND_COLOR, fontSize: COLUMN_FONT_SIZE, paddingLeft: COLUMN_PADDING_LEFT, paddingRight: COLUMN_PADDING_RIGHT, paddingTop: COLUMN_PADDING_TOP, paddingBottom: COLUMN_PADDING_BOTTOM }}>
          <button style={{ fontSize: "100%", marginBottom: "8px" }} onClick={() => {this.createCard(col.colID); this.dbCard()}} type="button">+</button>
          
          {col.cards.map((card) => (
            <div draggable = "true" className="cardBlock" key={card.card_id} onDragStart={(e) => this.dragStart(e, card.card_id, col.colID)}>
              <input type="text" placeholder='describe task' style = {{ width: "80%" }}></input>
              <button style={{ fontSize: "100%", marginBottom: "8px" }} onClick={() => this.remCard(col.colID, card.card_id)} type="button">-</button>
            </div>
          ))}
          
        </div>
      </div>
    ))

    const boardTabs = this.state.boardList.map((b, i) => (
      <button key={b.board_i} className="cardBlock" onClick={() => {this.selected(i)}} type="button">
        <input type="text" placeholder='name your board' style = {{ width: "80%" }}></input>
      </button>
    ))

    const loginWindow = (
      <div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>
          </div>
    
          <input type="text" placeholder="username" value={this.state.username}onChange={(e) => this.setState({ username: e.target.value })}/>
          <input type="text" placeholder="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
          <input type="password" placeholder="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
    
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 }}>
            <button type="button" onClick={() => this.setState({ logInState: "", username: "", email: "", password: "", successMsg: "" })}>close</button>
            <button type="button" onClick={() => this.sbmtCredentials()}>enter</button>
          </div>
        </div>
      </div>
    )

    return (
      <div className="mainview">
        <div className="rightSide">
          <div>
          <div style = {{ fontSize: "150%", fontWeight: 300 }}>
            Welcome {this.state.successMsg}
          </div>
            <text style = {{ fontSize: BUTTON_FONT_SIZE}}>&gt;&gt;{this.state.debugMsg} </text>
          </div>

          <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={() => {this.addBoard(); this.dbBoard()}}>+</button>
          <div>
            <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={() => {this.export()}}>export</button>
            <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={() => {this.login()}}>login</button>
            <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={() => {this.signUp()}}>sign up</button>
          </div>
          <div className ="cardBlock" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {this.state.logInState ? loginWindow : null}
          </div>          
          <div className="tabsView">
            {boardTabs}
          </div>
          
        </div>
        
        <div className="leftSide">
          <button style={{ fontSize: BUTTON_FONT_SIZE }} onClick={() => { this.addCol(); this.dbColumn();}} >+</button>
          <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
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
    <MainView board={new Board("board", [], [], 0)} selectedCol={new Column("mainColumn", 0, [])} selectedCard={new Card(0,0, "", "starterCard")}/>
  </React.StrictMode>
)
