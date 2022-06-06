import Infotrack from "./Infotrack";
//вывод музыки для Popup
export default function MusicPopup(item)
{
    return <div><ol> {item.item.map((name2) => 
      { //если есть картинка и превью
        if(name2.track.album.images.length > 2 && name2.track.preview_url !== null)
        return <Infotrack key={name2.track.name}tracksinfo={name2.track}/> })} </ol></div>;
} 