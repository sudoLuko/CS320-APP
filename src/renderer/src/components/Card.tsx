export default class MyCard {
	card_name: number
  	title: string
  	description: string

	constructor(card_name: number, title: string, description: string) {
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
