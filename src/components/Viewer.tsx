import { Artwork } from "@/data"
import { Center, OrbitControls, Stage } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Suspense } from "react"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

interface ViewerProps {
    artwork: Artwork
}

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
dracoLoader.preload()

// GLB 모델 컴포넌트
function Model({ url }: { url: string }) {
    const gltf = useLoader(GLTFLoader, url, (loader) => {
        loader.setDRACOLoader(dracoLoader)
    })

    return (
        <Center>
            <primitive
                object={gltf.scene}
                castShadow
                receiveShadow
            />
        </Center>)
}

const Viewer = ({ artwork }: ViewerProps) => {
    return (
        <div className="w-full h-[476px] md:h-[576px]">
            <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [4, -1, 8], fov: 35 }}>
                <color attach="background" args={[1, 1, 1]} />
                <Suspense fallback={null}>
                    <Stage
                        intensity={0.7}
                        shadows={{ type: 'contact', color: '#000000', opacity: 0.8, blur: 2.5 }}
                        adjustCamera={1}
                        environment="city">
                        <Model url={artwork.src} />
                    </Stage>
                </Suspense>
                <OrbitControls
                    enableZoom={true}
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.9}
                    minDistance={3}
                    maxDistance={7}
                />
            </Canvas>
        </div>
    )
}

export default Viewer
