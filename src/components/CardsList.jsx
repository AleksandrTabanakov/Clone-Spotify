import Card from "./Card";
//Это для главной страницы
const AlbumCard = [
  {
    text: "Подборка музыки по предпочтениям пользователей",
    key: "подборка",
    depth: [
      { url: "./img/Miksone.jpg", id: "workout 1" },
      { url: "./img/Mikstwo.jpg", id: "workout 2" },
      { url: "./img/Miksthree.jpg", id: "workout 3" },
    ],
  },
  {
    text: "Танцевальные треки",
    key: "танцевальные",
    depth: [
      { url: "./img/Danceone.jpg", id: "party 1" },
      { url: "./img/Dancetwo.jpg", id: "party 2" },
      { url: "./img/Dancethree.jpg", id: "party 3" },
    ],
  },
  {
    text: "Песенки под настроение",
    key: "настроение",
    depth: [
      { url: "./img/Moodone.jpg", id: "chill 1" },
      { url: "./img/Moodtwo.jpg", id: "chill 2" },
    ],
  },
  {
    text: "Популярные релизы",
    key: "релизы",
    depth: [
      { url: "./img/Popularone.jpg", id: "mood 1" },
      { url: "./img/Populartwo.jpg", id: "mood 2" },
      { url: "./img/Popularthree.jpg", id: "mood 3" },
      { url: "./img/Popularfour.jpg", id: "rock 2" },
    ],
  },
  {
    text: "фокус",
    key: "концентрация",
    depth: [
      { url: "./img/Concentrationone.jpg", id: "jazz 1" },
      { url: "./img/Concentrationtwo.jpg", id: "jazz 2" },
    ],
  },
];
//для поисковой страницы
const imgurlSearch = [
  { url: "./img2/1search.jpg", id: "workout 0" },
  { url: "./img2/2search.jpg", id: "edm_dance 0" },
  { url: "./img2/3search.jpg", id: "party 0" },
  { url: "./img2/4search.jpg", id: "rock 0" },
  { url: "./img2/5search.jpg", id: "mood 0" },
  { url: "./img2/6search.jpg", id: "jazz 0" },
  { url: "./img2/7search.jpg", id: "indie_alt 0" },
  { url: "./img2/8search.jpg", id: "pop 0" },
  { url: "./img2/9search.jpg", id: "wellness 0" },
];

export default function CardsList({ onPopupCallback, type }) {
  //Контент на страницу Home
  if (type === "Home") {
    return AlbumCard.map((item) => {
      return (
        <div key={item.key}>
          <h1 className="content__title">{item.text}</h1>
          <h1 className="content__img">
            {item.depth.map((album) => {
              return <Card  key={album.id} onPopupCallback={onPopupCallback} album={album} type={type} />;
            })}
          </h1>
        </div>
      );
    });
  } //иначе с search работает
  else {
    return imgurlSearch.map((album) => {
      return <Card key={album.id} onPopupCallback={onPopupCallback} album={album} type={type} />;
    });
  }
}
