import { artworks } from "@/data"
import { useParams } from "react-router-dom"
import Label from "./Label"
import Viewer from "./Viewer"

const Artwork = () => {
    const { id } = useParams()

    let artworkId: number

    if (id !== undefined) {
        artworkId = parseInt(id)
    }

    const artwork = artworks.find(artwork => artwork.id === artworkId)

    console.log(artwork)

    return (
        <div className="w-full p-8">
            <Viewer />
            <Label />
        </div>
    )
}

export default Artwork
