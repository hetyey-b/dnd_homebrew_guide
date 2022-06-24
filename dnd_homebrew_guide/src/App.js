import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RME from "./pages/RME";

function App() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/dnd_homebrew_guide/" element={<Home />} />
				<Route path="/dnd_homebrew_guide/rme/" element={<RME />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
