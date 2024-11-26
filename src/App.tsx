import { BrowserRouter, Route, Routes } from "react-router-dom"
import Artwork from "./components/Artwork"
import Home from "./pages/Home"

function App() {
  const basename = import.meta.env.DEV ? "" : "/asset-viewer"

  console.log(basename)

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artworks/:id" element={<Artwork />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
