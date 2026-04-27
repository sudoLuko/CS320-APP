import WebSocketLink from './components/WebSocketLink'

export default class Accounts {
	
  	userName: string
  	email: string
  	password: string

	constructor(userName: string, email: string, password: string) {
		this.userName = userName;
		this.email = email
		this.password = password;
	}
	
	getuser(): string{
		return this.username;
	}
	
	getemail(): string{
		return this.email;
	}
	
	clearaccount(): void {
		this.username = "";
		this.email = "";
		this.password = "";
	}
	
	
	login(username: string, password: string, app): void{
		
		this.username = username;
		this.password = password;		
		app.newLink.sendMessage(JSON.stringify({ "command":"login", "code": { "username": username, "password": password}}), this.postLogin, app);
		
	}
	
	postLogin(command, app): void{
		
		const response = JSON.parse(command);
		
		if (response.response == 0) {
			app.myAccount.email = response.email;
			app.setState({ 
				debugMsg: "Successfully logged in",
				logInState: "loggedIn",
				email: app.myAccount.email,
				password: ""
				})
	
		}
		else if (response.response == 1) {
			app.myAccount.clearaccount();
			app.setState({ 
				debugMsg: "Entered password does not match for entered username" 
				})
			
		}
		else if (response.response == 2) {
			app.myAccount.clearaccount();
			app.setState({ 
				debugMsg: "Entered username does not exist" 
				})
			
		}
		else if (response.response == 10) {
			app.myAccount.clearaccount();
			app.setState({ 
				debugMsg: "MariaDB down, please try again at a later time" 
				})
		}
		
	}
	
	signUp(username: string, email: string, password: string, app): void{
		
		this.username = username;
		this.email = email
		this.password = password;		
		app.newLink.sendMessage(JSON.stringify({ "command":"create_account", "code": { "username": username, "email": email, "password": password}}), this.postSignUp, app);
		
	}
	
	postSignUp(command, app): void{
		
		const response = JSON.parse(command);
		
		if (response.response == 0) {
			app.setState({ 
				debugMsg: "Successfully signed up",
				logInState: "loggedIn",
				password: ""
				})
	
		}
		else if (response.response == 1) {
			app.myAccount.clearaccount();
			app.setState({ 
				debugMsg: "Username is already taken" 
				})
		}

		
	}


}
