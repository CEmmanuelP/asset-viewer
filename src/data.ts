export interface Artwork {
  id: number
  parts: ArtworkPart[]
  thumbnail: string
  title: string
  author: string
  year: string
  size: string
  artType: string
  material: string
  description: string
  display?: Display
  scene?: SceneConfig
}

interface ArtworkPart {
  id: string
  name: string
  src: string
  position?: {
    x: number
    y: number
    z: number
  }
  rotation?: {
    x: number
    y: number
    z: number
  }
  scale?: number
}

interface Display {
  position?: {
    x: number
    y: number
    z: number
  }
  rotation?: {
    x: number
    y: number
    z: number
  }
  scale?: number
}

interface SceneConfig {
  camera?: {
    position: {
      x: number
      y: number
      z: number
    }
    fov?: number
  }
  controls?: {
    minDistance?: number
    maxDistance?: number
    minPolarAngle?: number
    maxPolarAngle?: number
  }
  backgroundColor?: string
}

const BASE_URL = import.meta.env.DEV ? "" : "/asset-viewer"

export const artworks: Artwork[] = [
  {
    id: 1,
    parts: [
      {
        id: "head",
        name: "용두",
        src: `${BASE_URL}/artworks/1/mihwangsa_dragonhead.glb`,
      },
    ],
    thumbnail: `${BASE_URL}/artworks/1/mihwangsa_dragonhead.webp`,
    title: "미황사 용두",
    author: "미상",
    year: "2024",
    size: "100x100cm",
    artType: "조각",
    material: "Oil on canvas",
    description: `Antonin Mercié (1845-1916) worked on the biblical theme of the young David vanquishing the giant Goliath, representing the boy in a similar a juvenile, adrogynous and graceful adolescent manner to those depictions from the Florentine Renaissance. The soft body and strong contrapposto nod to Donatello's 1440s masterpiece).

        The theme to commemorate the power of men after Belfort's heroic resistence to the Prussian invasions of 1870 is apparent in Mercié's work, who was commissioned by The Third Republic for public monuments to memorialize the glory of the French homeland. Such was the context of his 'Gloria Victis', presented at the Salon of 1874, or even his Quand Meme ('even so'), a model for a group erected in Belfort in 1884.

        This 3D printable model was digitised in collaboration between Scan the World and The Musée des Augustins. The sculpture was scanned in the museum and has been shared with their permission. The model can be downloaded and 3D printed from Scan the World.
        `,
  },
  {
    id: 2,
    parts: [
      {
        id: "monk",
        name: "승가대사상",
        src: `${BASE_URL}/artworks/2/mesh01.glb`,
      },
      {
        id: "rock",
        name: "광배",
        src: `${BASE_URL}/artworks/2/mesh02.glb`,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ],

    thumbnail: `${BASE_URL}/artworks/2/seonggasa.webp`,
    title: "승가사 석조승가대사 좌상",
    author: "미상",
    year: "2024",
    size: "100x100cm",
    artType: "조각",
    material: "Oil on canvas",
    description: `Antonin Mercié (1845-1916) worked on the biblical theme of the young David vanquishing the giant Goliath, representing the boy in a similar a juvenile, adrogynous and graceful adolescent manner to those depictions from the Florentine Renaissance. The soft body and strong contrapposto nod to Donatello's 1440s masterpiece).

        The theme to commemorate the power of men after Belfort's heroic resistence to the Prussian invasions of 1870 is apparent in Mercié's work, who was commissioned by The Third Republic for public monuments to memorialize the glory of the French homeland. Such was the context of his 'Gloria Victis', presented at the Salon of 1874, or even his Quand Meme ('even so'), a model for a group erected in Belfort in 1884.

        This 3D printable model was digitised in collaboration between Scan the World and The Musée des Augustins. The sculpture was scanned in the museum and has been shared with their permission. The model can be downloaded and 3D printed from Scan the World.
        `,
    display: {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      rotation: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
      scale: 2,
    },
    scene: {
      backgroundColor: "#000000",
      camera: {
        position: {
          x: 0,
          y: 5,
          z: 5,
        },
      },
      controls: {
        minDistance: 0,
        maxDistance: 4,
        minPolarAngle: 0,
        maxPolarAngle: Math.PI,
      },
    },
  },
]
