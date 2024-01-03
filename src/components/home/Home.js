import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className={"bg-primary bg-gradient"}>
                <h1 className={"text-center text-white display-5 p-5"}>
                    <span>ThreeJs Project</span> - <span className={"fw-bold"}>Jonas Tüchler</span>
                </h1>
            </div>
            <ul className={"list-group text-center mt-5"}>
                <li onClick={() => navigate("/square")}
                    className={"btn btn-link list-group-item list-group-item-action"}>
                    Rotating Square
                </li>
                <li onClick={() => navigate("/heightmap")}
                    className={"btn btn-link list-group-item list-group-item-action"}>
                    Heightmap
                </li>
                <li onClick={() => navigate("/normalmap")}
                    className={"btn btn-link list-group-item list-group-item-action"}>
                    Normalmap
                </li>
                <li onClick={() => navigate("/lighting")}
                    className={"btn btn-link list-group-item list-group-item-action"}>
                    Lighting
                </li>
            </ul>
        </div>
    );
};

export default Home;