import Infotrack from "./Infotrack";
//вывод музыки для Popup
/*
* @param {Objects}item информация о треке
* @return {HTMLElement} 
*/
export default function MusicPopup(item) {
  return (
    <div>
      <ol>
        {item.item.map((name2,count) => {
          //если есть картинка и превью
          if (name2.track.album.images.length > 2 && name2.track.preview_url !== null)
            return <Infotrack key={name2.track.name+count} tracksinfo={name2.track} />;
        })}
      </ol>
    </div>
  );
}
