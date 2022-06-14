import Infotrack from "./Infotrack";
//Вывод музыки из поисковика
/*
* @param {Object} item список пришедших треков
* @return {HTMLElement} поисковой страницы
*/
export default function MusicSearch(item) {
  return (
    <div>
      <ol>
        {item.item.tracks.items.map((name2, count) => {
          //если есть картинка и превью
          if (name2.album.images.length > 2 && name2.preview_url !== null) {
            return <Infotrack key={name2.name + count} tracksinfo={name2} />;
          }
        })}
      </ol>
    </div>
  );
}
