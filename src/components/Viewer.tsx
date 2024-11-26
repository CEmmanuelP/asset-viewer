import { Artwork } from "@/data"
import { Gltf, OrbitControls, Stage } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

interface ViewerProps {
    artwork: Artwork
}

// height: 476px
const Viewer = ({ artwork }: ViewerProps) => {
    console.log("src :", artwork.src)

    return (
        <div className="w-full h-[676px]">
            <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [4, -1, 8], fov: 35 }}>
                {/* <color attach="background" args={['skyblue']} /> */}
                <Stage
                    intensity={0.5}
                    shadows={{ type: 'accumulative', color: 'white', colorBlend: 2, opacity: 1 }}
                    adjustCamera={1}
                    environment="city">
                    <Gltf castShadow receiveShadow src={artwork.src} />
                </Stage>
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
