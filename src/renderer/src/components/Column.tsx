import CardView from "./Card"

export default class MyColumn {
  colID : number
	column_name : string
	cards : CardView [] 

	constructor(column_name: string, colID: number, cards: CardView []) {
		this.column_name = column_name;
		this.colID = colID;
		this.cards = cards;
	}

	addCard(): void {}
	delCard(): void {}

	static print_name() {
		return (
			<div style = {{display: "flex", alignItems: "center"}}>
				My Column
			</div>
		)
    }
}
