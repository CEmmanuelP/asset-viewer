import { ArrowLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
    const location = useLocation()
    const isArtworkPage = location.pathname.startsWith('/artworks/')

    return (
        <header className="w-full border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {isArtworkPage ? (
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-background">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            Back to gallery
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-semibold text-primary">H</span>
                        </div>
                        <Link to="/" className="flex items-center">
                            <span className="text-xl font-semibold">
                                HERITAGE PRISM
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
