import { BrowserRouter, Route, Routes } from "react-router-dom"
import Artwork from "./components/Artwork"
import Header from "./components/Header"
import Home from "./pages/Home"

function App() {
  const basename = import.meta.env.DEV ? "" : "/asset-viewer"

  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artworks/:id" element={<Artwork />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
