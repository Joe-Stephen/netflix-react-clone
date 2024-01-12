import React, { useEffect, useState } from "react";
import './Banner.css';
import axios from "../../axios";
import { imageUrl } from '../../Constants/Constants';
import { trending } from '../../urls';


function Banner() {
  const [movies, setMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    axios.get(trending).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, []);

  // Function to change the slide index
  const changeSlide = (action) => {
    console.log("called")
    console.log("the slide index",slideIndex)
    if (action === "previous") {
      setSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : movies.length - 1));
    } else {
      setSlideIndex((prevIndex) => (prevIndex < movies.length - 1 ? prevIndex + 1 : 0));
    }
  };

  useEffect(() => {
    if(movies.length>0){
        const intervalId = setInterval(() => {
          changeSlide("next");
        }, 5000);
        
        return () => clearInterval(intervalId); 
    }
  }, [slideIndex, movies]);

  return (
    <>
      <div style={{ backgroundImage: `url(${movies[slideIndex] ? imageUrl + movies[slideIndex].backdrop_path : ""})` }} className="banner">
        <div className="content">
          <h1 className="title">{movies[slideIndex] ? movies[slideIndex].original_title||movies[slideIndex].original_name : 'No Name' }</h1>
          <div className="banner-buttons">
            <button className="button">Play</button>
            <button className="button">ⓘ More info</button>
          </div>
          <h1 className="description">{movies[slideIndex] ? movies[slideIndex].overview : 'No Data Available'}</h1>
        </div>
        <div className="fade-bottom"></div>
      </div>
    </>
  );
}

export default Banner;
