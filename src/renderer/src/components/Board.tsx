import ColumnView from './Column'

export default class MyBoard {
  	columns : ColumnView[]
  	board_name : string

	constructor(board_name: string, columns: ColumnView[]) {
		this.board_name = board_name;
    this.columns = columns;
	}
  
	addColumn(): void {}
    delColumn(): void {}

	static print_columns() {
		return (
			<div>
				<table>
					<tr>
						<td>Column 1</td>
						<td>Column 2</td>
						<td>Column 3</td>
					</tr>
				</table>
			</div>
		)
    }
}

