import HeaderIndex from "./components/HeaderIndex"
import HeaderSearch from "./components/HeaderSearch"  
import Sidebar from "./components/Sidebar" 
import SidebarSearch from "./components/SidebarSearch" 
import ContentIndex from "./components/ContentIndex"
import ContentSearch from "./components/ContentSearch"
import Footer from "./components/Footer"
import { Routes, Route }  from "react-router-dom";
import "./css/App.css";
import { useState} from "react"
 function App() {
    return (
          <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="search.html" element={<Search />} />
             </Routes>
    );
  }
  function Home() {
     return (
         <div className="app"> 
         <HeaderIndex />
         <Sidebar />
         <ContentIndex/>
         <Footer />
         </div>
     );
 }
 function Search() {
  const [searchValue, setSearchValue] = useState("");

     return (
         <div className="app"> 
         <HeaderSearch onSearchCallback={setSearchValue}/>
         <SidebarSearch />
         <ContentSearch searchValue={searchValue} />
         <Footer />
         </div>
     );
 }
  export default App;
 