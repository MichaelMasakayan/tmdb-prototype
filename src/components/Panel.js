import React from "react";

import { MdTrendingUp } from "react-icons/md";
import { useContext } from "react";
import MovieScope from "../MovieScope";
import { AiOutlineStar } from "react-icons/ai";
//  functionality for left panel holding the two icons
const Panel = () => {
  const { header, getTrending, getFavourites } = useContext(MovieScope);

  return (
    <div className="panel">
      <div>
        <MdTrendingUp
          onClick={() => getTrending()}
          className={header === "Trending" ? "active" : null}
        />
      </div>
      <div>
        <AiOutlineStar
          onClick={() => getFavourites()}
          className={header === "Your favourites" ? "active" : null}
        />
      </div>
    </div>
  );
};
export default Panel;
