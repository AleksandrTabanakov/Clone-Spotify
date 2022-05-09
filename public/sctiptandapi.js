//реализуем апи поисковик
   const APIsearch = (function() {
   const clientId = 'c7879aa82e414a59b2e762b308012bca';
   const clientSecret = '17d4d73674ec468dbce16c09e9ed2ed4';
   // private methods получения токена
   const _getToken = async () => {
       const result = await fetch('https://accounts.spotify.com/api/token', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/x-www-form-urlencoded', 
               'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
           },
           body: 'grant_type=client_credentials'
       });
       const data = await result.json();
       return data.access_token;
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
   const result = await fetch(`${tracksEndPoint}`, {
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
  
const APPController = (function(APICtrl){
const $playList=document.querySelector('.music');
//метод проверки для понятия на какой странице мы находимся
if($playList!=null)
{
   //мы работаем с search.html
   //клик по кнопке(плейлисту)
const $searchInput=document.querySelector('.header__search');
Array.from($playList.querySelectorAll('.content__button')).forEach((button)=>{
   button.addEventListener('click',async(event)=>
   { 
       const token= await APICtrl.getToken();  
       const play=await APICtrl.getPlaylistByGenre(token,button.id);
       const musicplaylists=await APICtrl.getTracks(token,play[0].tracks.href);
     let message=`<div id="windowlist" class="div"><ol>`
     for(let i=0;i<musicplaylists.length;i++)
     {
       let string2=``;
       for(let j=0;j<musicplaylists[i].track.artists.length;j++)
       {  
          //поиск всех авторов
          if(j+1==musicplaylists[i].track.artists.length)
          string2+=`${musicplaylists[i].track.artists[j].name}`;
          else
          string2+=`${musicplaylists[i].track.artists[j].name},`;
       }
       message+=`<li class="li"><img src="${musicplaylists[i].track.album.images[2].url}" alt=""> ${musicplaylists[i].track.name} <br><p class="artists">${string2} </p></li>`;
     }
      message+=`</ol><br>
      <button type="button" class="item-actions_type_Close">Закрыть</button>
      </div>`
      $playList.insertAdjacentHTML('beforeend',message);
      return;
   })
})
//закрыть всплывающее окно
const deletemusic=(element)=>{
   element.closest('.div').remove();
 }
$playList.addEventListener('click',(event)=>{
   if(event.target.classList.contains('item-actions_type_Close'))
   {
       const lie=event.target.closest('.div');
       deletemusic(event.target);
   }
   return;
 }) 
 //вывести все, если символов введено <2
$searchInput.addEventListener('input',async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length < 2) {
      $playList.children[1].remove(); 
      $playList.insertAdjacentHTML('beforeend','<ol></ol>');
       [...$playList.querySelectorAll('.hide')].forEach(($content__button) => $content__button.classList.remove('hide'));
        return;
    }
    //поиск альбомов через id
 const k=$playList.querySelectorAll('.content__button');
for(let i=0;i<k.length;i++)
   {   const todoText = k[i].id;
     
        if (todoText.includes(searchValue)) {
           k[i].classList.remove('hide');
        } else {
           k[i].classList.add('hide');
        }
    }
    //токены
    const token= await APICtrl.getToken();  
    const typemusic=await APICtrl.getSearch(token,searchValue);
    //удаляю, потому что будем заводить новый тег
    $playList.children[1].remove(); 
    let string = `<ol>`;
    //вывод песен по названию
    for(let i=0;i<typemusic.tracks.items.length;i++)
    {
      let string2=``;
      for(let j=0;j<typemusic.tracks.items[i].artists.length;j++)
      {  
         //поиск всех авторов
         if(j+1==typemusic.tracks.items[i].artists.length)
         string2+=`${typemusic.tracks.items[i].artists[j].name}`;
         else
         string2+=`${typemusic.tracks.items[i].artists[0].name},`;
      }
      //название песни
     string+=`<li class="li"><img src="${typemusic.tracks.items[i].album.images[2].url}" alt=""> ${typemusic.tracks.items[i].name} 
     <br><p class="artists">${string2} </p></li>`;
    }
    string+=`</ol>`;
     $playList.insertAdjacentHTML('beforeend',string)
});
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
            if(flag==0)
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
          const musicplaylists=await APICtrl.getTracks(token,play[numberplaylist].tracks.href);
        let message=`<div id="windowlist" class="div"><ol>`
        for(let i=0;i<musicplaylists.length;i++)
        {
          let string2=``;
          for(let j=0;j<musicplaylists[i].track.artists.length;j++)
          {  
             //поиск всех авторов
             if(j+1==musicplaylists[i].track.artists.length)
             string2+=`${musicplaylists[i].track.artists[j].name}`;
             else
             string2+=`${musicplaylists[i].track.artists[j].name},`;
          }
          message+=`<li class="li"><img src="${musicplaylists[i].track.album.images[2].url}" alt=""> ${musicplaylists[i].track.name} 
          <br><p class="artists">${string2} </p></li>`;
        }
         message+=`</ol><br>
         <button type="button" class="item-actions_type_Close">Закрыть</button>
         </div>`
         $playListGlavnaya.insertAdjacentHTML('beforeend',message);
      })
   })
   const deletemusic=(element)=>{
      element.closest('.div').remove();
    }
   $playListGlavnaya.addEventListener('click',(event)=>{
      if(event.target.classList.contains('item-actions_type_Close'))
      {
          const lie=event.target.closest('.div');
          deletemusic(event.target);
      }
    })    
}
})(APIsearch);
