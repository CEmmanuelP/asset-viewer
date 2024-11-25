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
        src: "/artworks/1/mihwangsa_dragonhead.glb",
        thumbnail: "/artworks/1/mihwangsa_dragonhead.webp",
        title: "미황사 용두",
        author: "미상",
        year: "2024",
        size: "100x100cm",
        artType: "회화",
        material: "Oil on canvas",
        description: `Antonin Mercié (1845-1916) worked on the biblical theme of the young David vanquishing the giant Goliath, representing the boy in a similar a juvenile, adrogynous and graceful adolescent manner to those depictions from the Florentine Renaissance. The soft body and strong contrapposto nod to Donatello's 1440s masterpiece).

        The theme to commemorate the power of men after Belfort's heroic resistence to the Prussian invasions of 1870 is apparent in Mercié's work, who was commissioned by The Third Republic for public monuments to memorialize the glory of the French homeland. Such was the context of his 'Gloria Victis', presented at the Salon of 1874, or even his Quand Meme ('even so'), a model for a group erected in Belfort in 1884.

        This 3D printable model was digitised in collaboration between Scan the World and The Musée des Augustins. The sculpture was scanned in the museum and has been shared with their permission. The model can be downloaded and 3D printed from Scan the World.
        `
    }
    // {
    //     id: 2,
    //     src: "./artworks/2/model.glb",
    //     thumbnail: "./artworks/2/thumbnail.webp",
    //     title: "작품 2",
    //     author: "작가 2",
    //     year: "2024",
    //     size: "120x80cm",
    //     artType: "조각",
    //     material: "Bronze",
    //     description: "작품 설명 2"
    // }
]
