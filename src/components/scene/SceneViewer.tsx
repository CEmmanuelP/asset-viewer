import { Progress } from "@/components/ui/progress"
import { Center, OrbitControls, Stage, useProgress } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Suspense } from "react"
import { Color } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

interface SceneViewerProps {
  modelUrl: string
  backgroundColor?: string
}

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
)
dracoLoader.preload()

const Model = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <Center>
      <primitive object={gltf.scene} castShadow receiveShadow />
    </Center>
  )
}

const hexToRGB = (hex: string): [number, number, number] => {
  const color = new Color(hex)
  return [color.r, color.g, color.b]
}

const SceneViewer = ({
  modelUrl,
  backgroundColor = "#FFFFFF",
}: SceneViewerProps) => {
  const { progress, total, loaded } = useProgress()
  const isLoading = progress !== 100
  const bgColor = hexToRGB(backgroundColor)

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
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [4, -1, 8], fov: 35 }}
    >
      <color attach="background" args={bgColor} />
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
          <Model url={modelUrl} />
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
  )
}

export default SceneViewer
