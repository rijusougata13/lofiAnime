import React, { useState ,useRef, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faForward,
  faBackward,
  faVolumeUp,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';
import data from "../../playlist";

import './index.scss';

//import { playAudio } from "../utils";

const Player = ({
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  generateRandomNumber
}) => {

  const [volume,setVolume]=useState(0.5);
  const [songs, setSongs] = useState(data());
 
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage,
    });
  };
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };



  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((newSong) => {
      if (newSong.id === nextPrev.id) {
        return {
          ...newSong,
          active: true,
        };
      } else {
        return {
          ...newSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    generateRandomNumber();

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) audioRef.current.play();
    //playAudio(isPlaying, audioRef);
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  window.onkeydown = function(event){
    if(event.keyCode === 32) {
        event.preventDefault();
        playSongHandler();
        
        // document.querySelector('a').click(); //This will trigger a click on the first <a> element.
    }
    if(event.keyCode === 37) {
      event.preventDefault();
      skipTrackHandler("skip-back");
      // document.querySelector('a').click(); //This will trigger a click on the first <a> element.
  }
  if(event.keyCode === 39) {
    event.preventDefault();
    skipTrackHandler("skip-forward")
    // document.querySelector('a').click(); //This will trigger a click on the first <a> element.
}

};

useEffect(() => {

      document.getElementById("audio").volume = volume;
}, [volume]);


  return (
    <div className="player">
     
      <div className="song-info">
        { isPlaying?
            <Typewriter
              options={{
                strings:[currentSong.name+" ....."],
                autoStart: true,
                loop: true,
                pauseFor: 10000,
              }}
            />
            :
            <Typewriter
              options={{
                strings:["Paused ........"],
                autoStart: true,
                stop: true,

                pauseFor: 10000,
              }}
            />
              
          }
      </div>
      {/* <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>

        
      </div> */}
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="1x"
          color="rgb(145, 255, 0)"
          icon={faBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          color="rgb(145, 255, 0)"
          size="1x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          color="rgb(145, 255, 0)"
          size="1x"
          icon={faForward}
        />
        <audio
        id="audio"
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
      
      <div className="volume-controlbar">
        <FontAwesomeIcon
          color="rgb(145, 255, 0)"
          icon={faVolumeDown}
          style={{margin: "0 20px 0 30px"}}
        />
		  <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
       
        </div>
     
      </div>
    
    </div>
  );
};

export default Player;