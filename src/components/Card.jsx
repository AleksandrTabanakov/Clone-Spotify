/*
* @function Card
* метод, который отрисовывает картинки
* @param {Objects} onPopupCallback отвечает за имя той кнопки, которую кликнули
* @param {String} type тип страницы
* @param {Object} album наши треки
* @returns {Object} data данные
*/
export default function Card({ onPopupCallback, album, type }) {
    return (
      <button
        type="button"
        className="content__button"
        onClick={() => {
          onPopupCallback(album.id);
        }}
        id={album.id}
      >
        <img
          src={album.url}
          className={type === "Home" ? "picture_home" : "picture_search"}
          alt="Логотип"
        />
      </button>
    );
  }
  