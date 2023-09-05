import React from "react";
import { useContext } from "react";
import MovieScope from "../MovieScope";
// header component that will hold the search result example ("Search Results for: 'Batman'")
const Header = () => {
  const { header } = useContext(MovieScope);
  return <h1 className="section-title">{header}</h1>;
};

export default Header;
