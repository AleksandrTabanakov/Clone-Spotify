//Компонент для отображение sidebar поисковой страницы
import { Link } from "react-router-dom"
export default function SidebarSearch()
{
    return (
        <aside className="sidebar">
   <Link to="/" className="sidebar__logo link">
    <img src="./img/Spotify.png"className="logo2" alt="Логотип"/>
    <h1 className="sidebar__title">  Spotify</h1>
    </Link>
    <Link to="/" className="link2">&#128190;  Главная
    </Link>
    <Link to="/search.html" className="link2 glavnaya"> &#128269; Поиск 
    </Link>
  
  </aside>);
}