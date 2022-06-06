//Компонент для отображение header поисковой страницы
import debounce from 'lodash.debounce';
export default function HeaderSearch({onSearchCallback,type} )
{  //Смотрим какую страницу отрисовать
   if(type === "Home"){
      return (<header className="header">
      </header>);
   } //иначе поисковую
   else{
   const updateSearch=e=>onSearchCallback(e?.target?.value);
   const debounced=debounce(updateSearch,250);
    return (<header className="header">
    <input type="search"
    onChange={debounced}
    className="header__search" 
    placeholder=" &#128269; Исполнитель,трек или подкаст"/>
   </header>);
   }
}