//реализуем апи поисковик
   const APIsearch = (function() {
   const clientId = 'c7879aa82e414a59b2e762b308012bca';
   const clientSecret = '17d4d73674ec468dbce16c09e9ed2ed4';
   //cмотрим куки
   function getCookie(name) {
      let matches = document.cookie.split(';');
      for(let i=0;i<matches.length;i++)
      {
         if(matches[i][0]===' ')
        { 
           matches[i]=matches[i].slice(1);
        }
         if(matches[i].substring(0,7)===name)
         {
            return matches[i].substring(8);
         }
      }
      return undefined;
    }

   // private methods получения токена
   const _getToken = async () => {
   const cookie=getCookie("Mytoken");
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
       document.cookie=`Mytoken=${data.access_token}; max-age=${data.expires_in}`;
       return data.access_token;
      }
      else 
      return cookie;
   }
   //поиск
   const _getSearch = async (token,q) => {
      const limit=10;
      const link=`https://api.spotify.com/v1/search?q=${q}&type=track&limit=${limit}`;
      const data = await ApiReduction(link,token);
      return data;
  }
  //Получаем плейлисты нужной нам категории
  const _getPlaylistByGenre = async (token, categoryId) => {
   const limit = 10;
   const link=`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}`;
   const data = await ApiReduction(link,token);
   return data.playlists.items;
}
//получаем треки из плейлиста
const _getTracks = async (token, tracksEndPoint) => {
   const limit=50;
   const link=`${tracksEndPoint}?limit=${limit}`;
   const data = await ApiReduction(link,token);
   return data.items;
}
async function ApiReduction(link,token)
{
   const result = await fetch(link, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
  });
  const data = await result.json();
  return data;
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
function Popap(musicPlayLists)
{
   let message=`<div id="windowlist" class="div">`
   message+=Music(musicPlayLists);
   message+=` <button type="button" class="item-actions_type_Close">Закрыть</button>
   </div>`;
  return message;
}
function Music(musicPlayLists)
{
    message=`<ol>`;
 for(let i=0;i<musicPlayLists.length;i++)
  {
    let method=musicPlayLists[i];
    let artists = ""; 
    method.artists.forEach((artist, index) => {
      artists += artist.name;
      if (method.artists.length !== index + 1) {
      artists += ", ";
      }
      });
   //cмотрим сколько есть фотографий у данного альбома
    //Бывает что нет фотографии
    if(method.album.images.length<2)
     {  
        continue; 
     } 
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
   message+=`</ol>`;
  return message;
}
function closePopup(event)
{  
   const closePop=(element)=>{
      element.closest('.div').remove();
    }
    if(event.target.classList.contains('item-actions_type_Close'))
    {
        const lie=event.target.closest('.div');
        closePop(event.target);
    }
}
//треки из всплывающего окна
async function albomList(button)
{
   const token= await APIsearch.getToken();  
   //записываю айди плейлиста и его порядковый номер
  let numberplaylist=button.id.split(' '); 
   const play=await APIsearch.getPlaylistByGenre(token,numberplaylist[0]);
   const musicPlayLists=await APIsearch.getTracks(token,play[numberplaylist[1]].tracks.href);
   musicPlayLists.forEach((element,index) => {
     musicPlayLists[index]=musicPlayLists[index].track;
  });
  return musicPlayLists;
}
//работа с searc.hthml
async function searchHtml(PLAY_LIST)
{
   //клик по кнопке(плейлисту)
   const SEARCH_INPUT=document.querySelector('.header__search');
   PLAY_LIST.querySelectorAll('.content__button').forEach((button)=>{
   button.addEventListener('click',async(event)=>
   {  
      PLAY_LIST.insertAdjacentHTML('beforeend',Popap(await albomList(button)));
      return;
   })
})
  //закрыть всплывающее окно
  PLAY_LIST.addEventListener('click',(event)=>{
    closePopup(event);
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
     PLAY_LIST.querySelector('ol').remove(); 
     PLAY_LIST.insertAdjacentHTML('beforeend','<ol></ol>');
     //для проверки на наличие скрытых объектов
      const check=PLAY_LIST.querySelector('.hide');
      if(check!=null)
      check.classList.remove('hide');
       return;
   }
  PLAY_LIST.querySelector('.content__img').classList.add('hide');
   //токены
   const token= await APIsearch.getToken();  
   const typemusic=await APIsearch.getSearch(token,searchValue);
   //удаляю, потому что будем заводить новый тег
   PLAY_LIST.querySelector('ol').remove(); 
   //вывод песен по названию
   const musicPlayLists=typemusic.tracks.items;
    PLAY_LIST.insertAdjacentHTML('beforeend', Music(musicPlayLists));
}
//дебаунс функция вызванная с задержкой
  event=debounce(event,250);
SEARCH_INPUT.addEventListener('input',event);
}

const APPController = (function(){
const PLAY_LIST=document.querySelector('.music');
//метод проверки для понятия на какой странице мы находимся
if(PLAY_LIST!=null)
{
   //метод который вызывается на search.html странице
     searchHtml(PLAY_LIST);
}
else
{
   //используем другую страницу, в данном случае index.html
   const PLAY_LISTGlavnaya=document.querySelector('.playlistsgl');
     PLAY_LISTGlavnaya.querySelectorAll('.button_home').forEach((button)=>{
      button.addEventListener('click',async(event)=>
      { 
         PLAY_LISTGlavnaya.insertAdjacentHTML('beforeend',Popap(await albomList(button))); 
      })
   })
   PLAY_LISTGlavnaya.addEventListener('click',(event)=>{
      closePopup(event);
    })    
}
})();
