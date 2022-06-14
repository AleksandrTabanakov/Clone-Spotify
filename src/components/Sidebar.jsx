//Компонент для отображение sidebar главной страницы
import { Link } from "react-router-dom";
/*
* @param {String} type тип страницы
* @return {HTMLElement} Sidebar
*/
export default function Sidebar({ type }) {
  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar__logo link">
        <img src="./img/Spotify.png" className="logo2" alt="Логотип" />
        <h1 className="sidebar__title"> Spotify</h1>
      </Link>
      <Link to="/" className={`${type === "Home" ? "main" : null} transition`}>
        &#128190; Главная
      </Link>
      <Link to="/search" className={`${type === "Search" ? "main" : null} transition`}>
        &#128269; Поиск
      </Link>
    </aside>
  );
}