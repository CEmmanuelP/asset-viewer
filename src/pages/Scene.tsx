import SceneViewer from "@/components/scene/SceneViewer"
import { artworks } from "@/data"
import { useParams } from "react-router-dom"

const ScenePage = () => {
  const { id } = useParams()
  const artwork = artworks.find((artwork) => artwork.id === parseInt(id ?? ""))

  if (!artwork) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Model not found</p>
      </div>
    )
  }

  return (
    <div className="w-full h-screen">
      <SceneViewer
        modelUrl={artwork.src}
        backgroundColor={artwork.display?.backgroundColor || "#FFFFFF"}
      />
    </div>
  )
}

export default ScenePage
