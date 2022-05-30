const clientId = 'c7879aa82e414a59b2e762b308012bca';
const clientSecret = '17d4d73674ec468dbce16c09e9ed2ed4';
//Проверка на то, есть ли у нас уже токен
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
    return null;
  }
  //Получение токена
  async function _getToken() {
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
       })
       const data = await result.json();
       document.cookie=`Mytoken=${data.access_token}; max-age=${data.expires_in}`;
       return data.access_token;
      }
      else 
      {
      return cookie;
      }
   }
   //получаем плейлисты данной категории
   async function _getPlaylistByGenre (categoryId){
      const limit = 10;
      const link=`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}`;
      const data = await ApiReduction(link);
      return data.playlists.items;
    }
  async function ApiReduction(link)
{
   const token=await _getToken();
   const result = await fetch(link, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
  });
  if(!result.ok)
  return null;
  const data = await result.json();
  return data;
}
export default class Api
{
   //поиск треков 
    static async _getSearch (search)  {
      const limit=10;
      const link=`https://api.spotify.com/v1/search?q=${search}&type=track&limit=${limit}`;
      const data = await ApiReduction(link);
      return data;
  }
  //получение трека
  static async _getTracks (tracksEndPoint)  {
   let numberplaylist=tracksEndPoint.split(' '); 
   const play=await _getPlaylistByGenre(numberplaylist[0]);
      const limit=50;
      const link=`${play[numberplaylist[1]].tracks.href}?limit=${limit}`;
      const data = await ApiReduction(link);
      return data.items;
   }
}

