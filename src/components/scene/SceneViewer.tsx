import { Progress } from "@/components/ui/progress"
import { OrbitControls, Stage, useProgress } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { Color } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { ArtworkGroup, ViewerProps } from "../Viewer"
import { Button } from "../ui/button"

const DEFAULT_CAMERA = {
  position: { x: 4, y: -1, z: 8 },
  fov: 35,
}
const DEFAULT_CONTROLS = {
  minDistance: 0,
  maxDistance: 3,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
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

const SceneViewer = ({ artwork }: ViewerProps) => {
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
      <div className="w-full h-full bg-background flex flex-col items-center justify-center gap-4">
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
    <div className="w-full h-full relative">
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
            adjustCamera={false}
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

      {/* Watermark */}
      <div className="absolute bottom-6 right-4 text-right">
        <p className="text-xs text-muted-foreground">
          자료제공 : 조선건축사사무소
        </p>
        <p className="text-xs text-muted-foreground">
          웹 뷰어 모델 가공 : 스튜디오 점선면
        </p>
      </div>
    </div>
  )
}

export default SceneViewer
