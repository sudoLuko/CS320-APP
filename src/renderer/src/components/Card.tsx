export default class MyCard {

	constructor(card_name) {
		this.card_name = card_name;
	}
	
	static print_name() {
		return (
			<div>
				My Card
			</div>
		)
    }
    
}
