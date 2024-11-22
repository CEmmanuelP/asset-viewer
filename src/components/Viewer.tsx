import { Box } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"


const Viewer = () => {
    return (
        <div className="w-full h-[476px] border-solid border-2 border-zinc-500">
            <Canvas>
                <Box />
            </Canvas>
        </div>
    )
}

export default Viewer
