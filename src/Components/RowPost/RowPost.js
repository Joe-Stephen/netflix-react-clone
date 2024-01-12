import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./RowPost.css";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../../Constants/Constants";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState();
  useEffect(() => {
    console.log("entered axios");
    axios
      .get(props.url)
      .then((response) => {
        console.log("the response  ", response.data);
        setMovies(response.data.results);
      })
      .catch((error) => {
        alert("Network error!");
      });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleMovieTrailer = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("empty array!");
        }
      })
      .catch((error) => {
        alert("Error");
      });
  };
  const containerId = `slides-${props.title}`;
  const scrollBanner = (direction) => {
    const scrollElement = document.getElementById(containerId);
    if (scrollElement) {
      if (direction === "right") {
        scrollElement.scrollLeft += 200;
      } else {
        scrollElement.scrollLeft -= 200;
      }
    }
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row-content">
        <div className="scroll-icon left" onClick={() => scrollBanner("left")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div id={containerId} className="posters">
          {movies.map((obj, index) => (
            <LazyLoadImage
              onClick={() => handleMovieTrailer(obj.id)}
              key={index}
              className={props.isSmall ? "small-card" : "card"}
              src={`${imageUrl + obj.poster_path}`}
              alt="poster"
              loading="lazy"
            />
          ))}
        </div>
        <div
          className="scroll-icon right"
          onClick={() => scrollBanner("right")}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      {urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
