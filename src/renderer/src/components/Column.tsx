export default class MyColumn {
	
	constructor(column_name) {
		this.column_name = column_name;
	}
	
	static print_name() {
		return (
			<div>
				My Column
			</div>
		)
    }
}
