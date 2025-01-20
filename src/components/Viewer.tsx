import { Artwork } from "@/data"
import { Center, OrbitControls, Stage, useProgress } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Suspense } from "react"
import { Color } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Progress } from "./ui/progress"

interface ViewerProps {
  artwork: Artwork
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

const Viewer = ({ artwork }: ViewerProps) => {
  const { progress, total, loaded } = useProgress()
  const isLoading = progress !== 100

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
    <div className="w-full h-[476px] md:h-[576px]">
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
            <Model url={artwork.src} />
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
    </div>
  )
}

export default Viewer
