import { BrowserRouter, Route, Routes } from "react-router-dom"
import Artwork from "./components/Artwork"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artworks/:id" element={<Artwork />} />
      </Routes>
    </BrowserRouter>
  )

  // return (
  //   <div className="w-full px-8">
  //     <Viewer />
  //     <Label />
  //   </div>
  // )
}

export default App
