import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RMEProperties from "./pages/RMEProperties";
import RMEWeapons from "./pages/RMEWeapons";

function App() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/dnd_homebrew_guide/" element={<Home />} />
				<Route path="/dnd_homebrew_guide/rme_weapons/" element={<RMEWeapons />} />
				<Route path="/dnd_homebrew_guide/rme_properties/" element={<RMEProperties />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
