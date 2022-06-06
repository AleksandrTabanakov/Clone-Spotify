//Компонент для отображение контента поисковой страницы
import { useState,useEffect, createContext } from "react"
import Api from './Api';
import Popup from './Popup'
import MusicSearch from './MusicSearch'
import CardsList from "./CardsList";
export default function ContentSearch(Value)
{
  //мои папки с треками
 const searchValue=Value.searchValue;
  const [categorySearch, setCategorySearch] = useState(null);
  const [popupActive, setPopupActive] = useState(); 
  const getSearchData = async () => {
    if(searchValue.length > 0){
    const categorySearch2=await Api.getSearch(searchValue);
    setCategorySearch(categorySearch2);
     }
    }
useEffect(() => {
  getSearchData();
  }, [searchValue]);
  //Если активировали поиск то сюда
 if(searchValue.length > 1 && categorySearch !== null){
  return ( 
          <main className="content" tabIndex="0">
          <h1 className="content__title">Найденные треки</h1>
          <section className="music"> 
          <h1 className="content__img"> 
          <MusicSearch item={categorySearch}/>
          </h1>
          <ol>
          </ol>
          </section>
          </main>
          );
 } //Вывод базовой странички
 else{
    return ( 
            <main className="content" tabIndex="0">
            <h1 className="content__title">Всё остальное</h1>
            <section className="music"> 
            <h1 className="content__img"> 
            <CardsList onPopupCallback={setPopupActive} type={"Search"}/> 
            <Popup active={popupActive} setActive={setPopupActive}/>
            </h1>
            <ol>
            </ol>
            </section>
            </main>
            );
     }
}