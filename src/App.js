import {BrowserRouter, Route, Routes} from "react-router-dom";
import RotatingSquare from "./components/rotatingSquare/RotatingSquare";
import Heightmap from "./components/heightmap/Heightmap";
import Normalmap from "./components/normalmap/Normalmap";
import Lighting from "./components/lighting/Lighting";
import Home from "./components/home/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/square" element={<RotatingSquare/>}/>
                <Route path="/heightmap" element={<Heightmap/>}/>
                <Route path="/normalmap" element={<Normalmap/>}/>
                <Route path="/lighting" element={<Lighting/>}/>
                <Route path="*" element={<p>Sorry, nothing here</p>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
