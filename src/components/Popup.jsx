import{useState,useEffect} from "react";
import Api from './Api';
import Infotrack from "./Infotrack";
//выводим треки в попап
function MusicPopup(item) {
  return <div key={1}><ol> {item.item.map((name2) => 
    { //если есть картинка и превью
      if(name2.track.album.images.length>2&&name2.track.preview_url!==null)
      return <Infotrack key={name2.track.name}tracksinfo={name2.track}/> })} </ol></div>;
  } 
const Popup =({active,setActive})=>
{
  const [category, setCategory] = useState(null);
  const fetch = async () => {
  if(active)
  {
  const category2 = await Api._getTracks(`${active}`);
  setCategory(category2);
  }
  }
  useEffect(() => {
    fetch();
    }, [active]);
  //выводим попап если апи уже подгрузилась
 if(active&&category!==null)
 { 
  return <div id="windowlist" className="div"> <MusicPopup item={category}/>
  <button type="button" className="item-actions_type_Close" onClick={()=>setActive(false)}>Закрыть</button>
   </div>;
 }
  else return <div></div>;
};
export default Popup;
