import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  // Trying to have music auto play on page load

  //   useEffect(() => {
  //     window.addEventListener("load", () => {
  //       console.log("loaded");
  //       setPlaying(true);
  //       audio.play();
  //     });

  //     return () => {
  //       window.removeEventListener("load", () => {
  //         setPlaying(true);
  //         audio.play();
  //       });
  //     };
  //   }, [audio]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const NavMusic = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default NavMusic;
