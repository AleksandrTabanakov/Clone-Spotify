//Компонент для отображение контента главной страницы
import { useState } from "react";
import CardsList from "./CardsList";
import Popup from "./Popup";
/*
* @return {HTMLElement} Content главной страницы
*/
export default function ContentIndex() {
  //для попапа
  const [popupActive, setPopupActive] = useState(false);
  return (
    <main className="content" tabIndex="0">
      <section className="playlistsgl">
        <CardsList onPopupCallback={setPopupActive} type={"Home"} />
        <Popup active={popupActive} setActive={setPopupActive} />
      </section>
    </main>
  );
}
