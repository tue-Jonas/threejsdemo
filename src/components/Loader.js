import {Html, useProgress} from "@react-three/drei";

const Loader = () => {
    const {active, progress, errors, item, loaded, total} = useProgress();
    return (
        <Html center>
            {active && (
                <div>
                    <div>Loading: {progress}%</div>
                    <div>{item}</div>
                </div>
            )}
        </Html>
    );
};

export default Loader;