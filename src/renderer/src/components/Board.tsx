import ColumnView from './Column'

export default class Board {
  	columns : ColumnView[]
	boards : Board []
  	board_name : string
	board_i: number


	constructor(board_name: string, columns: ColumnView[], boards: Board[], board_i: number) {
		this.board_name = board_name
    	this.columns = columns
		this.boards = boards
		this.board_i = board_i
	}

	addBoard(board: Board): Board {
		const boardList = this.boards.slice()
		
		boardList.push(board)
		this.boards = boardList

		return new Board(this.board_name, this.columns, boardList, this.board_i)
	}

	addColumn(column: ColumnView): Board {
		const newList = this.columns.slice()

		newList.push(column)

		this.columns = newList
		return new Board(this.board_name, newList, this.boards, this.board_i)
	}

    delColumn(column: ColumnView): void {
		const currList = this.columns
		const newList = currList.slice()

		newList.splice(newList.indexOf(column), 1)

		this.columns = newList
	}
}

