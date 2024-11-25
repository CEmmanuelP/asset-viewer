import { HashRouter, Route, Routes } from "react-router-dom"
import Artwork from "./components/Artwork"
import Home from "./pages/Home"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artworks/:id" element={<Artwork />} />
      </Routes>
    </HashRouter>
  )
}

export default App
