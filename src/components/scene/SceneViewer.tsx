import { Progress } from "@/components/ui/progress"
import { OrbitControls, Stage, useProgress } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { Color } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { Model, ViewerProps } from "../Viewer"
import { Button } from "../ui/button"

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

  const [meshes, setMeshes] = useState<{ id: string; name: string }[]>([])
  const [scene, setScene] = useState<THREE.Group | null>(null)
  const [visibleParts, setVisibleParts] = useState<Record<string, boolean>>({})

  const cameraConfig = artwork.scene?.camera || DEFAULT_CAMERA
  const controlsConfig = artwork.scene?.controls || DEFAULT_CONTROLS

  const handleMeshesFound = (
    meshList: { id: string; name: string }[],
    modelScene: THREE.Group
  ) => {
    setMeshes(meshList)
    setScene(modelScene)

    const initialVisibility = meshList.reduce((acc, mesh) => {
      acc[mesh.id] = true
      return acc
    }, {} as Record<string, boolean>)
    setVisibleParts(initialVisibility)
  }

  const toggleVisibility = (partId: string) => {
    if (!scene) return

    setVisibleParts((prev) => {
      const newVisibility = { ...prev, [partId]: !prev[partId] }
      const model = scene.getObjectByProperty("uuid", partId) as THREE.Mesh

      if (model) model.visible = newVisibility[partId]

      return newVisibility
    })
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
            adjustCamera={1}
            environment="city"
          >
            <Model
              url={artwork.src}
              position={artwork.display?.position}
              rotation={artwork.display?.rotation}
              scale={artwork.display?.scale}
              onMeshesFound={handleMeshesFound}
            />
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

      {meshes.length > 0 && (
        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
          {meshes.map((mesh) => (
            <Button
              key={mesh.id}
              onClick={() => toggleVisibility(mesh.id)}
              variant={visibleParts[mesh.id] ? "default" : "secondary"}
              size="sm"
            >
              {mesh.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SceneViewer
