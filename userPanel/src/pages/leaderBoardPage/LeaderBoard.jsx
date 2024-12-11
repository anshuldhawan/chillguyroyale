import React from "react";
import chillGuyImage from "@/assets/images/chill-guy.png";
import { Card, CardContent } from "@/components/ui/card";
import LeaderBoardTable from "./components/LeaderBoardTable";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routeConstant";
import ShareOnTwitter from "@/components/ShareOnTwitter";

export const LeaderBoard = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(ROUTES.HOME, { replace: true });
  };

  const currentUrl = window.location.href; // Get current page URL
  const tweetText =
    "The battle for the most chill guy. Check it out ! #chillguyroyale";

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-sky-300 to-sky-200 flex items-center justify-center px-4 sm:px-0">
      <Card className="relative h-[80%] lg:h-full lg:max-h-[32rem] w-full sm:w-full sm:max-w-lg md:w-full md:max-w-lg lg:w-full lg:max-w-2xl xl:w-full xl:max-w-3xl p-0">
        <CardContent className="flex flex-col items-center gap-y-6 p-1 md:px-4 xl:px-6 py-6 h-full w-full">
          <div className=" w-full flex flex-col items-center justify-center relative">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-indieFlower text-blue-500 ">
              LeaderBoard
            </h1>
            <ShareOnTwitter text={tweetText} url={currentUrl} />
            <ArrowLeft
              className="text-sky-500 absolute left-0 top-1 cursor-pointer"
              onClick={handleBackToHome}
            />
          </div>
          <LeaderBoardTable />
        </CardContent>

        <div className="absolute h-16 w-16 -top-4 -right-4 sm:h-20 sm:w-20 sm:-top-6 sm:-right-6 md:h-24 md:w-24 md:-top-6 md:-right-6 lg:h-28 lg:w-28 lg:-top-12 lg:-right-10 xl:h-32 xl:w-32 xl:-top-12 xl:-right-12">
          <img
            src={chillGuyImage}
            alt="chill guy logo"
            className="object-contain w-full h-full"
          />
        </div>
      </Card>
    </main>
  );
};
