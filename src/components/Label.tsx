import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Artwork } from "@/data"

interface LabelProps {
    artwork?: Artwork
}

const Label = ({ artwork }: LabelProps) => {
    if (!artwork) return null

    const details = [
        { label: "Title", value: artwork.title },
        { label: "Creator", value: artwork.author },
        { label: "Date Created", value: artwork.year },
        { label: "Type", value: artwork.artType },
        { label: "Medium", value: artwork.material },
        { label: "Physical Dimensions", value: artwork.size }
    ]

    return (
        <Card className="mt-6">
            <CardContent className="p-6">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-semibold">{artwork.title}</h1>
                        <p className="text-lg text-muted-foreground">{artwork.author}, {artwork.year}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {details.map((detail, index) => (
                            <div key={index} className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {detail.label}
                                </p>
                                <p className="text-base">
                                    {detail.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Description */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {artwork.description}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Label
