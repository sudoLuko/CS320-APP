// produce a board HTML element
export default class MyBoard {

	constructor(board_name) {
		this.board_name = board_name;
	}
	
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

