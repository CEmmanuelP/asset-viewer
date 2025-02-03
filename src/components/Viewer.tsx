import { Artwork } from "@/data"
import { Center, OrbitControls, Stage, useProgress } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { Color, Euler, Group } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"

export interface ViewerProps {
  artwork: Artwork
}
export interface ModelProps {
  url: string
  rotation?: { x: number; y: number; z: number }
  scale?: number

  onMeshesFound: (meshes: { id: string; name: string }[], scene: Group) => void
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

const Model = ({ url, rotation, scale = 1, onMeshesFound }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  console.log(gltf.scene)

  useEffect(() => {
    const meshList: { id: string; name: string }[] = []

    //@ts-expect-error - child maybe group | mesh
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material && !Array.isArray(child.material)) {
          meshList.push({
            id: child.uuid,
            name: child.name,
          })
        }
      }
    })

    onMeshesFound(meshList, gltf.scene)
  }, [])

  const euler = rotation
    ? new Euler(rotation.x, rotation.y, rotation.z)
    : new Euler(0, 0, 0)

  return (
    <Center>
      <primitive
        object={gltf.scene}
        castShadow
        receiveShadow
        rotation={euler}
        scale={scale}
      />
    </Center>
  )
}

const Viewer = ({ artwork }: ViewerProps) => {
  const { progress, total, loaded } = useProgress()
  const isLoading = progress !== 100
  const [meshes, setMeshes] = useState<{ id: string; name: string }[]>([])
  const [scene, setScene] = useState<THREE.Group | null>(null)
  const [visibleParts, setVisibleParts] = useState<Record<string, boolean>>({})

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
    artwork.display?.backgroundColor !== undefined
      ? hexToRGB(artwork.display?.backgroundColor)
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
        camera={{ position: [4, -1, 8], fov: 35 }}
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
              rotation={artwork.display?.rotation}
              scale={artwork.display?.scale}
              onMeshesFound={handleMeshesFound}
            />
          </Stage>
        </Suspense>
        <OrbitControls
          enableZoom={true}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.9}
          minDistance={5}
          maxDistance={7}
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

export default Viewer
