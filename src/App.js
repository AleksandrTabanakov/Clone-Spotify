import Home from "./Home/Home"
import Search from "./Search/Search";
import { Routes, Route }  from "react-router-dom";
import "./css/App.css";
 function App() {
    return (
        <div className="app">
          <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="search" element={<Search />} />
             </Routes>
            </div>
    );
  }
  export default App;
 