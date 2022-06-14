//Компонент для отображени поисковой страницы
import HeaderSearch from "../components/Header";
import Sidebar from "../components/Sidebar";
import ContentSearch from "../components/ContentSearch";
import Footer from "../components/Footer";
import { useState } from "react";
export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const search = "Search";
  return (
    <>
      <HeaderSearch onSearchCallback={setSearchValue} type={search} />
      <Sidebar type={search} />
      <ContentSearch searchValue={searchValue} />
      <Footer />
    </>
  );
}
