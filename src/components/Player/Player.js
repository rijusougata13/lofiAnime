import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStepBackward, faVolumeDown, faStepForward } from "@fortawesome/free-solid-svg-icons";
import Typewriter from "typewriter-effect";
import data from "../../playlist";
import Equilizer from "../../assets/gif/equilizer.gif";
import "./index.scss";

const Player = () => {

  const [songs, setSongs] = useState(data());

  const [currentSong, setCurrentSong] = useState(
    songs[Math.floor(Math.random() * songs.length)]
  );

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(0.1);

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

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

  const songEndHandler = async (e) => {
    e.preventDefault();
    const event = new KeyboardEvent("keydown", {
      keyCode: 37,
    });
    window.dispatchEvent(event);
  };

  const changeVolumeWithKeyboard = (event) => {
    if (event.keyCode === 38) {
      // Up arrow key
      event.preventDefault();
      setVolume((prevVolume) => Math.min(prevVolume + 0.05, 1));
    } else if (event.keyCode === 40) {
      // Down arrow key
      event.preventDefault();
      setVolume((prevVolume) => Math.max(prevVolume - 0.05, 0));
    }
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
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
      } else {
        audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const changeTrackHandlerRandom = async (e) => {
    e.preventDefault();

    try {
      const randomNumber = Math.floor(Math.random() * songs.length);
      await setCurrentSong(songs[randomNumber]);
      activeLibraryHandler(songs[randomNumber]);

      // Pause the audio and reset isPlaying to false before changing the source
      if (isPlaying) {
        await audioRef.current.play();
      }
      setIsPlaying(true);
      await audioRef.current.play();
    } catch (error) {
      e.preventDefault();
      const event = new KeyboardEvent("keydown", {
        keyCode: 37,
      });
      window.dispatchEvent(event);
      console.log("Error changing the track:", error);
    }
  };

  window.onkeydown = function (event) {
    if (event.keyCode === 32) {
      event.preventDefault();
      playSongHandler();
    }
    if (event.keyCode === 37) {
      event.preventDefault();
      changeTrackHandlerRandom(event);
    }
    if (event.keyCode === 39) {
      event.preventDefault();
      changeTrackHandlerRandom(event);
    }
  };

  useEffect(() => {
    document.getElementById("audio").volume = volume;
    // Add event listeners for up and down arrow keys
    window.addEventListener("keydown", changeVolumeWithKeyboard);

    // Clean up the event listeners when component unmounts
    return () => {
      window.removeEventListener("keydown", changeVolumeWithKeyboard);
    };
  }, [volume]);

  return (
    <div className="player">
      <div className="song-info">
        {isPlaying ? (
          <Typewriter
            options={{
              strings: [currentSong.name],
              autoStart: true,
              loop: true,
              pauseFor: 10000,
            }}
          />
        ) : (
          <Typewriter
            options={{
              strings: ["Paused ..."],
              autoStart: true,
              loop: true,

              pauseFor: 10000,
            }}
          />
        )}
      </div>

      <div className="play-control">
        {isPlaying && (
          <img src={Equilizer} height={50} width={150} padding={0} alt="" />
        )}
        <FontAwesomeIcon
          onClick={(e) => changeTrackHandlerRandom(e)}
          className="skip-back"
          size="1x"
          color="rgb(145, 255, 0)"
          icon={faStepBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          color="rgb(145, 255, 0)"
          size="1x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={(e) => changeTrackHandlerRandom(e)}
          className="skip-forward"
          color="rgb(145, 255, 0)"
          size="1x"
          icon={faStepForward}
        />
        <audio
          id="audio"
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={(e) => {
            songEndHandler(e);
          }}
        ></audio>

        <div className="volume-controlbar">
          <FontAwesomeIcon
            color="rgb(145, 255, 0)"
            icon={faVolumeDown}
            style={{ margin: "0 20px 0 30px" }}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(event) => {
              setVolume(event.target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
