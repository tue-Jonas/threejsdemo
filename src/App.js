import {BrowserRouter, Route, Routes} from "react-router-dom";
import RotatingSquare from "./components/rotatingSquare/RotatingSquare";
import Text3D from "./components/text3D/Text3D";
import Heightmap from "./components/heightmap/Heightmap";
import Normalmap from "./components/normalmap/Normalmap";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RotatingSquare/>}/>
                <Route path="/text3d" element={<Text3D/>}/>
                <Route path="/heightmap" element={<Heightmap/>}/>
                <Route path="/normalmap" element={<Normalmap/>}/>
                <Route path="*" element={<p>Sorry, nothing here</p>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
