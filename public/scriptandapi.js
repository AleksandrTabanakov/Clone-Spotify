//реализуем апи поисковик
   const APIsearch = (function() {
   const clientId = 'c7879aa82e414a59b2e762b308012bca';
   const clientSecret = '17d4d73674ec468dbce16c09e9ed2ed4';
   // private methods получения токена
   const _getToken = async () => {
 const cookie=document.cookie;
      if(!cookie)
      {
      const result = await fetch('https://accounts.spotify.com/api/token', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/x-www-form-urlencoded', 
               'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
           },
           body: 'grant_type=client_credentials'
       });
       const data = await result.json();
       document.cookie=`${data.access_token}; max-age=1200`;
       return data.access_token;
      }
      else 
      return cookie;
   }
   //поиск
   const _getSearch = async (token,q) => {
      const limit=10;
      const result = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=${limit}`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });
      const data = await result.json();
      return data;
  }
  //Получаем плейлисты нужной нам категории
  const _getPlaylistByGenre = async (token, categoryId) => {
   const limit = 10;
   const result = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}`, {
       method: 'GET',
       headers: { 'Authorization' : 'Bearer ' + token}
   });

   const data = await result.json();
   return data.playlists.items;
}
//получаем треки из плейлиста
const _getTracks = async (token, tracksEndPoint) => {
   const limit=50;
   const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
       method: 'GET',
       headers: { 'Authorization' : 'Bearer ' + token}
   });
   const data = await result.json();
   return data.items;
}
  return {
     getToken(){
        return _getToken();
     },
     getSearch(token,q){
        return _getSearch(token,q);
     },
     getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
     },
     getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
     }
  }
})();
//функция для вывода треков
function Music(musicPlayLists,number)
{
 let message=`<div id="windowlist" class="div"><ol>`
 if(number===0)
 {
    message=`<ol>`;
 }
 for(let i=0;i<musicPlayLists.length;i++)
 {
   let method=number===0?musicPlayLists[i]:musicPlayLists[i].track;
   let artists = ""; 
   method.artists.forEach((artist) => {
      artists += artist.name+", ";
      });
   artists=artists.slice(0,-2);
   //Бывает что нет фотографии
   if(method.album.images.length<2)
   continue; 
   //images[2] - это размер нашей картинки
   const picture=method.album.images[2].url;
   const track=method.name;  
   const preview=method.preview_url;
   if(preview===null)
      continue;
   message+=`<li class="li"><img src="${picture}" alt=""> ${track} <br><p class="artists">${artists} </p> <audio controls>          
          <source src="${preview}" type="audio/ogg; codecs=vorbis"> 
          </audio></li>`;
 }
 message+=number===0?`</ol>`:`</ol>
 <button type="button" class="item-actions_type_Close">Закрыть</button>
 </div>`;
  return message;
}

const APPController = (function(APICtrl){
const $playList=document.querySelector('.music');
//метод проверки для понятия на какой странице мы находимся
if($playList!=null)
{
   //мы работаем с search.html
   //клик по кнопке(плейлисту)
   const $searchInput=document.querySelector('.header__search');
   ($playList.querySelectorAll('.content__button')).forEach((button)=>{
   button.addEventListener('click',async(event)=>
   { 
       const token= await APICtrl.getToken();  
       const play=await APICtrl.getPlaylistByGenre(token,button.id);
       const musicPlayLists=await APICtrl.getTracks(token,play[0].tracks.href);
      $playList.insertAdjacentHTML('beforeend',Music(musicPlayLists));
      return;
   })
})
//закрыть всплывающее окно
const closePopup=(element)=>{
   element.closest('.div').remove();
 }
$playList.addEventListener('click',(event)=>{
   if(event.target.classList.contains('item-actions_type_Close'))
   {
       const lie=event.target.closest('.div');
       closePopup(event.target);
   }
   return;
 }) 
 
 const debounce=(fn,ms)=>{
    let timeout;
    return function(){
       const fnCall=()=>{fn.apply(this,arguments)}
      clearTimeout(timeout);
      timeout=setTimeout(fnCall,ms)
    };
 }
 //функция отвечающая за поиск
 async function event(e)
 {
   const searchValue = e.target.value;
   //вывести все, если символов введено <2
   if (searchValue.length < 2) {
     $playList.querySelector('ol').remove(); 
     $playList.insertAdjacentHTML('beforeend','<ol></ol>');
     //для проверки на наличие скрытых объектов
      const check=$playList.querySelector('.hide');
      if(check!=null)
      check.classList.remove('hide');
       return;
   }
  $playList.querySelector('.content__img').classList.add('hide');
   //токены
   const token= await APICtrl.getToken();  
   const typemusic=await APICtrl.getSearch(token,searchValue);
   //удаляю, потому что будем заводить новый тег
   $playList.querySelector('ol').remove(); 
   //вывод песен по названию
   const musicPlayLists=typemusic.tracks.items;
    $playList.insertAdjacentHTML('beforeend', Music(musicPlayLists,0));
}
//дебаунс функция вызванная с задержкой
  event=debounce(event,250);

$searchInput.addEventListener('input',event);
}
else
{
   //используем другую страницу, в данном случае glavnaya.html
   const $playListGlavnaya=document.querySelector('.playlistsgl');
   Array.from($playListGlavnaya.querySelectorAll('.button_home')).forEach((button)=>{
      button.addEventListener('click',async(event)=>
      { 
         const token= await APICtrl.getToken();  
         let buttonid="";
         let numberplaylist="";
         //записываю айди плейлиста и его порядковый номер
         let flag=0;
         for(let i=0;i<button.id.length;i++)
         {
            if(flag===0)
            {
               if(button.id[i]==" ")
               {
                  flag=1;
                  continue;
               }
              buttonid+=button.id[i];
            }
            else
            numberplaylist+=button.id[i];
         }
          const play=await APICtrl.getPlaylistByGenre(token,buttonid);
          const musicPlayLists=await APICtrl.getTracks(token,play[numberplaylist].tracks.href);
         $playListGlavnaya.insertAdjacentHTML('beforeend',Music(musicPlayLists));
      })
   })
   const closePopup=(element)=>{
      element.closest('.div').remove();
    }
   $playListGlavnaya.addEventListener('click',(event)=>{
      if(event.target.classList.contains('item-actions_type_Close'))
      {
          const lie=event.target.closest('.div');
          closePopup(event.target);
      }
    })    
}
})(APIsearch);
