import {Html, useProgress} from "@react-three/drei";

const Loader = () => {
    const {active, progress, errors, item, loaded, total} = useProgress();
    return (
        <Html center>
            {active && (
                <div className={"text-white text-center"}>
                    <div className="spinner-border m-4" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading: {progress}%</div>
                    <div>{item}</div>
                </div>
            )}
        </Html>
    );
};

export default Loader;