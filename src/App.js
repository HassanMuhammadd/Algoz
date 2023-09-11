import './App.css';
import Bfs from './Components/Bfs';
import Navbar from './Components/Navbar';
import SearchScreen from './Components/SearchScreen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Welcome from './Components/Welcome';

function App() {

    return (
    <BrowserRouter>
        <Navbar />
        <div className="mainContainer">
                <Routes>
                    <Route path='*' element={<Welcome/>}/>
                    <Route path="binary" element={<SearchScreen type={1}/>}/>
                    <Route path="linear" element={<SearchScreen type={2}/>}/>
                    <Route path="bfs" element={<Bfs/>}/>
                </Routes>
        </div>
    </BrowserRouter>

    );
}

export default App;
