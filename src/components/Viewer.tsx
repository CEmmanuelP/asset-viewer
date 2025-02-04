import { Artwork } from "@/data"
import { Center, OrbitControls, Stage, useProgress } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { Color, Euler, Vector3 } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"

const DEFAULT_CAMERA = {
  position: { x: 4, y: -1, z: 8 },
  fov: 35,
}
const DEFAULT_CONTROLS = {
  minDistance: 5,
  maxDistance: 7,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 1.9,
}

export interface ViewerProps {
  artwork: Artwork
}
export interface ModelProps {
  url: string
  position?: { x: number; y: number; z: number }
  rotation?: { x: number; y: number; z: number }
  scale?: number
}

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
)
dracoLoader.preload()

const hexToRGB = (hex: string): [number, number, number] => {
  const color = new Color(hex)
  return [color.r, color.g, color.b]
}

export const Model = ({ url, rotation, position, scale }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  console.log(gltf.scene)

  const vector = position
    ? new Vector3(position.x, position.y, position.z)
    : new Vector3(0, 0, 0)

  const euler = rotation
    ? new Euler(rotation.x, rotation.y, rotation.z)
    : new Euler(0, 0, 0)

  const number = scale ? scale : 1

  return (
    <primitive
      object={gltf.scene}
      castShadow
      receiveShadow
      position={vector}
      rotation={euler}
      scale={number}
    />
  )
}

const ArtworkGroup = ({
  artwork,
  visibleParts,
}: {
  artwork: Artwork
  visibleParts: Record<string, boolean>
}) => {
  const display = artwork.display || {}

  return (
    <Center>
      <group
        position={[
          display.position?.x || 0,
          display.position?.y || 0,
          display.position?.z || 0,
        ]}
        rotation={[
          display.rotation?.x || 0,
          display.rotation?.y || 0,
          display.rotation?.z || 0,
        ]}
        scale={display.scale || 1}
      >
        {artwork.parts.map(
          (part) =>
            visibleParts[part.id] && (
              <Model
                key={part.id}
                url={part.src}
                position={part.position}
                rotation={part.rotation}
                scale={part.scale}
              />
            )
        )}
      </group>
    </Center>
  )
}

const Viewer = ({ artwork }: ViewerProps) => {
  const { progress, total, loaded } = useProgress()
  const isLoading = progress !== 100
  const [visibleParts, setVisibleParts] = useState<Record<string, boolean>>(
    () =>
      artwork.parts.reduce((acc, part) => {
        acc[part.id] = true
        return acc
      }, {} as Record<string, boolean>)
  )

  const cameraConfig = artwork.scene?.camera || DEFAULT_CAMERA
  const controlsConfig = artwork.scene?.controls || DEFAULT_CONTROLS

  const toggleVisibility = (partId: string) => {
    setVisibleParts((prev) => ({
      ...prev,
      [partId]: !prev[partId],
    }))
  }

  const backgroundColor =
    artwork.scene?.backgroundColor !== undefined
      ? hexToRGB(artwork.scene?.backgroundColor)
      : hexToRGB("#FFFFFF")

  if (isLoading) {
    return (
      <div className="w-full h-[576px] bg-background flex flex-col items-center justify-center gap-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">Loading 3D Model...</h3>
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% ({loaded}/{total} resources)
          </p>
        </div>
        <Progress value={progress} className="w-[60%] max-w-md" />
      </div>
    )
  }

  return (
    <div className="w-full h-[476px] md:h-[576px] relative">
      <Canvas
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{
          position: [
            cameraConfig.position.x,
            cameraConfig.position.y,
            cameraConfig.position.z,
          ],
          fov: cameraConfig.fov,
        }}
      >
        <color attach="background" args={backgroundColor} />
        <Suspense fallback={null}>
          <Stage
            intensity={0.7}
            shadows={{
              type: "contact",
              color: "#000000",
              opacity: 0.8,
              blur: 2.5,
            }}
            adjustCamera={1}
            environment="city"
          >
            <ArtworkGroup artwork={artwork} visibleParts={visibleParts} />
          </Stage>
        </Suspense>
        <OrbitControls
          enableZoom={true}
          makeDefault
          minPolarAngle={controlsConfig.minPolarAngle}
          maxPolarAngle={controlsConfig.maxPolarAngle}
          minDistance={controlsConfig.minDistance}
          maxDistance={controlsConfig.maxDistance}
        />
      </Canvas>

      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
        {artwork.parts.map((part) => (
          <Button
            key={part.id}
            onClick={() => toggleVisibility(part.id)}
            variant={visibleParts[part.id] ? "default" : "secondary"}
            size="sm"
          >
            {part.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Viewer
