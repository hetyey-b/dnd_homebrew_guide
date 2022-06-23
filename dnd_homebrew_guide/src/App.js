import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return ( 
		<BrowserRouter>
			<Routes>
				<Route path="/dnd_homebrew_guide/" element={<Home />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
