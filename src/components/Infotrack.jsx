export default function Infotrack(tracksinfo) {
  //Будем получать всех артистов
  let artists = "";
  tracksinfo.tracksinfo.artists.forEach((artist, index) => {
    artists += artist.name;
    if (tracksinfo.tracksinfo.artists.length !== index + 1) {
      artists += ", ";
    }
  });
  return (
    <li className="li">
      <img src={tracksinfo.tracksinfo.album.images[2].url} alt="" />
      &nbsp;{tracksinfo.tracksinfo.name}
      <p className="artists">{artists} </p>{" "}
      <audio controls>
        <source src={tracksinfo.tracksinfo.preview_url} type="audio/ogg; codecs=vorbis"></source>
      </audio>
    </li>
  );
}
