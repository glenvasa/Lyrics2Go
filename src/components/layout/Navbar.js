import React from "react";
import NavMusic from "./NavMusic";
import LTG from "./LTG-1.mp3";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <div className="navbar-brand text-warning mb-0 text-center mx-auto">
        <span className="h3">Lyrics2Go</span>
        <br />
        <span className="h5 text-white">Lyrics ... on the Fly</span>
        <NavMusic url={LTG} />{" "}
      </div>
    </nav>
  );
};

export default Navbar;
