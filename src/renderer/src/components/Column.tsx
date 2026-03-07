import CardView from "./Card"
//single size to keep padding consistant
const COLUMN_PADDING: string = "10px";
const COLUMN_PADDING_LEFT: string = COLUMN_PADDING;
const COLUMN_PADDING_RIGHT: string = COLUMN_PADDING;
const COLUMN_PADDING_TOP: string = COLUMN_PADDING;
const COLUMN_PADDING_BOTTOM: string = COLUMN_PADDING;

//Constants for easier style prototyping
const COLUMN_BORDER: string = "3px solid #ccc";
const COLUMN_WIDTH: string = "200px";
const COLUMN_HEIGHT: string = "300px";
const COLUMN_TEXT_COLOR: string = "black";
const COLUMN_FONT_WEIGHT: string = "bold";
const COLUMN_BACKGROUND_COLOR: string = "white";
const COLUMN_FONT_STYLE: string = "normal";

//single size to keep both button and column text the same size
const COLUMN_BUTTON_SIZE: string = "200%";
const COLUMN_FONT_SIZE: string = COLUMN_BUTTON_SIZE;

export default class Column {
    colID : number
	column_name : string
	cards : CardView [] 

	constructor(column_name: string, colID: number, cards: CardView []) {
		this.column_name = column_name;
		this.colID = colID;
		this.cards = cards;
	}

	addCard(card: CardView): Column {
		const cardList = this.cards.slice()
		cardList.push(card)
		this.cards = cardList
	
		return new Column(this.column_name, this.colID, cardList)
	}

	delCard(): void {}

	static print_name() {
		return (
			<div style = {{display: "flex", alignItems: "center"}}>
				My Column
			</div>
		)
    }

	render () {
		return (
			<div style={{ border: COLUMN_BORDER, color: COLUMN_TEXT_COLOR, fontWeight: COLUMN_FONT_WEIGHT, backgroundColor: COLUMN_BACKGROUND_COLOR, fontSize: COLUMN_FONT_SIZE, paddingLeft: COLUMN_PADDING_LEFT, paddingRight: COLUMN_PADDING_RIGHT, width: COLUMN_WIDTH, height: COLUMN_HEIGHT }}>
				{this.column_name}
			</div>
		)
	}
}
