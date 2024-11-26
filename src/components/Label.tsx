import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Artwork } from "@/data"
import { CalendarDays, Frame, Palette, Ruler } from "lucide-react"

interface LabelProps {
    artwork?: Artwork
}

const Label = ({ artwork }: LabelProps) => {
    if (!artwork) return null

    const details = [
        {
            label: "Date Created",
            value: artwork.year,
            icon: CalendarDays
        },
        {
            label: "Type",
            value: artwork.artType,
            icon: Palette
        },
        {
            label: "Medium",
            value: artwork.material,
            icon: Frame
        },
        {
            label: "Physical Dimensions",
            value: artwork.size,
            icon: Ruler
        }
    ]

    return (
        <Card className="mt-6">
            <CardContent className="p-6">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight">{artwork.title}</h1>
                                <p className="text-lg text-muted-foreground mt-1">{artwork.author}</p>
                            </div>
                            <Badge variant="secondary" className="mt-1">
                                {artwork.year}
                            </Badge>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {details.map((detail, index) => {
                            const Icon = detail.icon
                            return (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">
                                            {detail.label}
                                        </p>
                                        <p className="text-sm font-medium">
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">About this piece</h2>
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
