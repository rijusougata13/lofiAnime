import React, { useState, useEffect } from "react";
import Player from "./components/Player/Player";
import Loffy1 from "./assets/gif/loffy1.gif";
import Loffy2 from "./assets/gif/loffy2.gif";
import Loffy3 from "./assets/gif/loffy3.gif";
import Loffy4 from "./assets/gif/loffy4.gif";
import Loffy5 from "./assets/gif/loffy5.gif";
import Loffy6 from "./assets/gif/loffy6.gif";
import Loffy7 from "./assets/gif/loffy7.gif";
import Loffy8 from "./assets/gif/loffy8.gif";
import Loffy9 from "./assets/gif/loffy9.gif";
import Loffy0 from "./assets/gif/loffy0.gif";
import { FaGithub, FaStar } from "react-icons/fa";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { MetroSpinner } from "react-spinners-kit";
import "./App.scss";
import "./firebase";

// https://github.com/choubari/React-LoFi-Music-App/blob/master/src/App.js

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 10));
  const imgList = [
    Loffy0,
    Loffy1,
    Loffy2,
    Loffy3,
    Loffy4,
    Loffy5,
    Loffy6,
    Loffy7,
    Loffy8,
    Loffy9,
  ];


  useEffect(() => {

    // Interval that generate a random number between 0 and imgs length after 20 seconds
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * imgList.length + 1));
    }, 20000);

    return () => clearInterval(interval);
  }, [imgList.length]);

  return (
    <div className="App">

      {/* Image background */}
      <div className="img-container">
       {/* If image has not finished loading, show the metrospinner */}
        {imgList[number] ? (
          <img src={`${imgList[number]}`} alt="Loffy" />
        ) : (
          <div className="loader">
            <MetroSpinner size={30} color="#fff" />
          </div>
        )}
      </div>


      <div className="wrapper">
        <FaGithub
          onClick={() =>
            window.open("https://github.com/rijusougata13/loffyAnime")
          }
          className="icon github"
          icon={faStar}
        />

        <FaStar
          onClick={() =>
            window.open("https://www.buymeacoffee.com/rijusougata13")
          }
          className="icon star"
          icon={faStar}
        />

        <Player />
      </div>
    </div>
  );
}

export default App;
