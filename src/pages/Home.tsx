import { Card, CardContent } from "@/components/ui/card"
import { artworks } from "@/data"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="w-full">
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
                                    src={artwork.thumbnail}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-lg">{artwork.title}</h3>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-600">{artwork.author}</span>
                                        <span className="text-sm text-gray-500 mx-2">|</span>
                                        <span className="text-sm text-gray-500">{artwork.year}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home
