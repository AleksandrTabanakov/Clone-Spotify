//Компонент для отображение контента поисковой страницы
import { useState,useEffect, createContext } from "react"
import Api from './Api';
import Popup from './Popup'
import Infotrack from "./Infotrack";
//для уникального айди
let count=0;
//Вывод музыки из поисковика
function MusicSearch(item)
{  return <div><ol> {item.item.tracks.items.map((name2) => 
    { count++;
      //если есть картинка и превью
      if(name2.album.images.length>2&&name2.preview_url!==null)
      return <Infotrack key={name2.name+count} tracksinfo={name2}/> })} </ol></div>;
}
export default function ContentSearch(Value)
{
  //мои папки с треками
 const searchValue=Value.searchValue;
 let imgurlSearch=[
  {url:"./img2/1search.jpg",id:"workout 0"},
  {url:"./img2/2search.jpg",id:"edm_dance 0"},
  {url:"./img2/3search.jpg",id:"party 0"},
  {url:"./img2/4search.jpg",id:"rock 0"},
  {url:"./img2/5search.jpg",id:"mood 0"},
  {url:"./img2/6search.jpg",id:"jazz 0"},
  {url:"./img2/7search.jpg",id:"indie_alt 0"},
  {url:"./img2/8search.jpg",id:"pop 0"},
  {url:"./img2/9search.jpg",id:"wellness 0"} 
  ];
  const [categorySearch, setCategorySearch] = useState(null);
  const [PopupActive,setPopupActive]=useState(); 
  const fetch2 = async () => {
    if(searchValue.length>0)
    {
    const categorySearch2=await Api._getSearch(searchValue);
    setCategorySearch(categorySearch2);
     }
    }
function List()
{ 
 return imgurlSearch.map((item) => {
       return <button key={item.id} type="button" className="content__button"onClick={()=>{setPopupActive(item.id)}} id={item.id}> <img src={item.url} className="picture_search" alt="Логотип"/> </button>;
   })
}
useEffect(() => {
  fetch2();
  }, [searchValue]);
  //Если активировали поиск то сюда
 if(searchValue.length>1&&categorySearch!==null)
 {
  return ( <main className="content" tabIndex="0">
  <h1 className="content__title">Найденные треки</h1>
  <section className="music"> 
  <h1 className="content__img"> 
  <MusicSearch item={categorySearch}/>
  <Popup active={PopupActive}setActive={setPopupActive}/>
    </h1>
 <ol>
 </ol>
  </section>
 </main>);
 } //Вывод базовой странички
 else{
    return ( <main className="content" tabIndex="0">
    <h1 className="content__title">Всё остальное</h1>
    <section className="music"> 
    <h1 className="content__img"> 
    <List />
    <Popup active={PopupActive}setActive={setPopupActive}/>
      </h1>
   <ol>
   </ol>
    </section>
   </main>);
 }
}