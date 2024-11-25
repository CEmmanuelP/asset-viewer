export interface Artwork {
    id: number,
    src: string,
    thumbnail: string,
    title: string,
    author: string,
    year: string,
    size: string,
    artType: string,
    material: string,
    description: string
}

export const artworks: Artwork[] = [
    {
        id: 1,
        src: "./artworks/1/model.glb",
        thumbnail: "./artworks/1/thumbnail.webp",
        title: "작품 1",
        author: "작가 1",
        year: "2024",
        size: "100x100cm",
        artType: "회화",
        material: "Oil on canvas",
        description: "작품 설명 1"
    },
    {
        id: 2,
        src: "./artworks/2/model.glb",
        thumbnail: "./artworks/2/thumbnail.webp",
        title: "작품 2",
        author: "작가 2",
        year: "2024",
        size: "120x80cm",
        artType: "조각",
        material: "Bronze",
        description: "작품 설명 2"
    }
]
