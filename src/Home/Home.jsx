//Компонент для отображени главной страницы
import HeaderSearch from "../components/Header"
import Sidebar from "../components/Sidebar" 
import ContentIndex from "../components/ContentIndex"
import Footer from "../components/Footer"
export default function Home()
{  
    const home="Home";
    return (
        <>
        <HeaderSearch onSearchCallback={null} type={home}/>
        <Sidebar type={home}/>
        <ContentIndex/>
        <Footer />
        </>
    );
}