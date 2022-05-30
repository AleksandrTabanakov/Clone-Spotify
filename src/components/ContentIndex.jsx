//Компонент для отображение контента главной страницы
import { useState,useEffect } from "react"
import Popup from './Popup'
export default function ContentIndex()
{
  const [PopupActive,setPopupActive]=useState(false);
  const AlbumCard=[
    {text:"Подборка музыки по предпочтениям пользователей",
    key:"подборка",
     depth:[
       { url:"./img/Miksone.jpg",id:"workout 1"},
       { url:"./img/Mikstwo.jpg",id:"workout 2"},
       { url:"./img/Miksthree.jpg",id:"workout 3"}
      ]},
    {text:"Танцевальные треки",
    key:"танцевальные", 
    depth:[
      { url:"./img/Danceone.jpg",id:"party 1"},
      { url:"./img/Dancetwo.jpg",id:"party 2"},
      { url:"./img/Dancethree.jpg",id:"party 3"}
    ]},
    {text:"Песенки под настроение",
    key:"настроение",
     depth:[
       { url:"./img/Moodone.jpg",
       id:"chill 1"}
       ,{ url:"./img/Moodtwo.jpg",
       id:"chill 2"}
      ]},
    {text:"Популярные релизы",
    key:"релизы", 
    depth:[
      { url:"./img/Popularone.jpg",
      id:"mood 1"},
      { url:"./img/Populartwo.jpg",id:"mood 2"},
      { url:"./img/Popularthree.jpg",id:"mood 3"},
      { url:"./img/Popularfour.jpg",id:"mood 4"}
    ]},
    {text:"фокус",
    key:"концентрация", 
    depth:[
      { url:"./img/Concentrationone.jpg",id:"jazz 1"},
      { url:"./img/Concentrationtwo.jpg",id:"jazz 2"}
    ]},
    ]
  function ListCard()
  {
   return   AlbumCard.map((item) => {
       return <div key={item.key} > <h1 className="content__title">{item.text}</h1> <h1 className="content__img">{item.depth.map((albom)=>
          {return <button key={albom.id} type="button" className="button_home" onClick={()=>setPopupActive(albom.id)} id={albom.id}>  
          <img src={albom.url} className="picture_home" alt="Логотип"/> </button>})}</h1></div>;
     })
  }
    return ( <main className="content" tabIndex="0">  
    <section className="playlistsgl">
   <ListCard /> 
   <Popup active={PopupActive}setActive={setPopupActive}/>
   </section>  
</main>);
}