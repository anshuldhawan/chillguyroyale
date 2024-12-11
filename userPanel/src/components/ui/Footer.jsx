import React from "react";
import XLogo from "../../assets/images/twitter-logo.png";

const Footer = () => {
  return (
    <footer className="w-full font-indieFlower bg-white flex justify-center items-center p-2 absolute bottom-0">
      <div className="flex items-center gap-x-2 text-sky-600 px-1">
        <p className="text-xl flex items-center gap-2 text-center">
          For suggestions, comments, etc.. contact me on:
        </p>
        <a
          href="https://x.com/AnshulDhawan001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <img className="w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8" src={XLogo} alt="Twitter" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
