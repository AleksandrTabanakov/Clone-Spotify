import { useState, useEffect } from "react";
import Api from "./Api";
import MusicPopup from "./MusicPopup";
//выводим треки в попап
const Popup = ({ active, setActive }) => {
  const [category, setCategory] = useState(null);
  const getSearchData = async () => {
    if (active) {
      const category2 = await Api.getTracks(`${active}`);
      setCategory(category2);
    }
  };
  useEffect(() => {
    getSearchData();
  }, [active]);
  //выводим попап если апи уже подгрузилась
  if (active && category !== null) {
    return (
      <div id="windowlist" className="div">
        <MusicPopup item={category} />
        <button type="button" className="item-actions_type_Close" onClick={() => setActive(false)}>
          Закрыть
        </button>
      </div>
    );
  } else return <div></div>;
};
export default Popup;
