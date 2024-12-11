import React from "react";
import TWITTER_LOGO from "@/assets/images/twitter-logo.png";

const ShareOnTwitter = ({ text, url }) => {
  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;

    // Open the Twitter share window
    window.open(twitterUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className="font-indieFlower text-sky-600 font-bold flex items-center justify-center gap-x-4 text-sm"
    >
      Share on Twitter{" "}
      <div className="w-4 h-4">
        <img
          src={TWITTER_LOGO}
          alt="twitter logo"
          className="w-full h-full object-contain"
        />
      </div>
    </button>
  );
};

export default ShareOnTwitter;
