//Компонент для отображение sidebar главной страницы
import { Link } from "react-router-dom";
export default function Sidebar({ type }) {
  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar__logo link">
        <img src="./img/Spotify.png" className="logo2" alt="Логотип" />
        <h1 className="sidebar__title"> Spotify</h1>
      </Link>
      <Link to="/" className={type === "Home" ? "linkSidebar main" : "linkSidebar"}>
        &#128190; Главная
      </Link>
      <Link to="/search" className={type === "Search" ? "linkSidebar main" : "linkSidebar"}>
        &#128269; Поиск
      </Link>
    </aside>
  );
}
