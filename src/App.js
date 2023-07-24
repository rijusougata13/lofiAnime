import React, { useState, useEffect } from "react";
import "./App.scss";
import Player from "./components/Player/Player";
import data from "./playlist";
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

import "./firebase";

// https://github.com/choubari/React-LoFi-Music-App/blob/master/src/App.js

function App() {
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(
    songs[Math.floor(Math.random() * songs.length)]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [number, setNumber] = useState(0);
  const ImgList = [
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

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * ImgList.length);
    setNumber(randomNumber);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${ImgList[number]})`,
      }}
    >
      <div className="wrapper">
        <FaGithub
          onClick={() =>
            window.open("https://github.com/rijusougata13/loffyAnime")
          }
          style={{ position: "absolute", top: "20px", right: "20px" }}
          size={30}
          color="#fff"
          icon={faStar}
        />
        <FaStar
          onClick={() =>
            window.open("https://www.buymeacoffee.com/rijusougata13")
          }
          style={{ position: "absolute", top: "70px", right: "20px" }}
          size={30}
          color="#fff"
          icon={faStar}
        />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          generateRandomNumber={generateRandomNumber}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
}

export default App;
