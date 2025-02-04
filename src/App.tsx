import { ReactNode } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Artwork from "./components/Artwork"
import Header from "./components/Header"
import Home from "./pages/Home"
import ScenePage from "./pages/Scene"

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4">{children}</div>
      </main>
    </div>
  )
}

function App() {
  const basename = import.meta.env.DEV ? "" : "/asset-viewer"

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/artworks/:id"
          element={
            <DefaultLayout>
              <Artwork />
            </DefaultLayout>
          }
        />
        <Route path="/scene/:id" element={<ScenePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
