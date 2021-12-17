import NavBar from "./NavBar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import UserContext from "./UserContext";
import { useState } from "react";

function App() {
	const [user, setUser] = useState(window.sessionStorage.user);

	return (
		<div className="App">
			<BrowserRouter>
				<UserContext.Provider value={{ user, setUser }}>
					<NavBar />
					<Routes />
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
