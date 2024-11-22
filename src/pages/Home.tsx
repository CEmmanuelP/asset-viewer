import { Card, CardContent } from "@/components/ui/card"
import { artworks } from "@/data"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="w-full p-8 border-solid border-2 border-zinc-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                    <Link
                        key={artwork.id}
                        to={`/artworks/${artwork.id}`}
                        className="transition-transform hover:scale-105"
                    >
                        <Card className="overflow-hidden">
                            <div className="aspect-square bg-gray-100">
                                <img
                                    src={artwork.src}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-1">{artwork.title}</h3>
                                <p className="text-sm text-gray-600">{artwork.author}</p>
                                <p className="text-sm text-gray-500">{artwork.year}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home
