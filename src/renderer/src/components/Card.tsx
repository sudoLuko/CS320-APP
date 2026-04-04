export default class MyCard {
	card_id: number
	card_name: number
  	title: string
  	description: string

	constructor(card_id: number, card_name: number, title: string, description: string) {
		this.card_id = card_id;
		this.card_name = card_name;
		this.title = title;
		this.description = description;
	}
	
	openEdit(): void {}
	moveCard(): void {}
	update(): void {}

	static print_name() {
		return (
			<div>
				My Card
			</div>
		)
    }
    
}
