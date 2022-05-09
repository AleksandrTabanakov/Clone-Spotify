const $playList=document.querySelector('.playlist');
const $searchInput=document.querySelector('.header__search');

//Удаление добавленных треков
document.cookie="name=Dobavlenie;max-age=3600";
myStorage = window.localStorage;

//Добавляем то что имеем в локал сторэдж
for(let i=0;i<localStorage.length;i++)
{
    $playList.insertAdjacentHTML('beforeend',localStorage.getItem(localStorage.key(i)));
}

//Метод удаления
const deletemusic=(element)=>{
    element.closest('.li').remove();
}
$playList.addEventListener('click',(event)=>{
    if(event.target.classList.contains('item-actions_type_delete'))
    {
        const lie=event.target.closest('.li');
        //Локальное удаления
        localStorage.removeItem(lie.children[0].innerText);
        deletemusic(event.target);
    }
})

//поиск треков в моей медиатеке
$searchInput.addEventListener('input', (event) => {
  //Перевели все в маленькие буквы, для того, чтобы не зависить от регистра и был болеее простой поиск
  const searchValue = event.target.value.toLowerCase();
  if (searchValue.length < 2) {
     [...$playList.querySelectorAll('.hide')].forEach(($content__logo) => $content__logo.classList.remove('hide'));
      return;
  }
  
const k=$playList.querySelectorAll('.li');
for(let i=0;i<k.length;i++)
 { //Перевели все в маленькие буквы, для того, чтобы не зависить от регистра и был болеее простой поиск  
   const todoText = k[i].children[0].innerText.toLowerCase();
      if (todoText.includes(searchValue)) {
         k[i].classList.remove('hide');
      } else {
         k[i].classList.add('hide');
      }
  }  
});
