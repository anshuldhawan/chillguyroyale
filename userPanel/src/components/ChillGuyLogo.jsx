import React from "react";
import chillGuyImage from "@/assets/images/chill-guy.png";

const ChillGuyLogo = () => {
  return (
    <>
      <div className="absolute h-16 w-16 -top-4 -right-4 sm:h-20 sm:w-20 sm:-top-6 sm:-right-6 md:h-24 md:w-24 md:-top-6 md:-right-6 lg:h-28 lg:w-28 lg:-top-6 lg:-right-8 xl:h-32 xl:w-32 xl:-top-12 xl:-right-12">
        <img
          src={chillGuyImage}
          alt="chill guy logo"
          className="object-contain w-full h-full"
        />
      </div>
    </>
  );
};

export default ChillGuyLogo;
