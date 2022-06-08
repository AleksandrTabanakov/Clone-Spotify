export default function Card({ onPopupCallback, album, type }) {
    return (
      <button
        key={album.id}
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
  