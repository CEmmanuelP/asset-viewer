import { artworks } from "@/data"
import { useParams } from "react-router-dom"
import Label from "./Label"
import Viewer from "./Viewer"

const Artwork = () => {
    const { id } = useParams()

    const artwork = artworks.find(artwork => artwork.id === parseInt(id ?? ""))

    if (!artwork) {
        return <div>Artwork not found</div>
    }

    return (
        <div className="w-full py-8">
            <Viewer artwork={artwork} />
            <Label artwork={artwork} />
        </div>
    )
}

export default Artwork
