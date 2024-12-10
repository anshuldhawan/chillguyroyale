import React from "react";
import { Card, CardContent } from "./ui/card";
import chillGuyImage from "@/assets/images/chill-guy.png";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routeConstant";

const NotFound = () => {
  const navigate = useNavigate();

  const backToHomeHandler = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-sky-300 to-sky-200 flex items-center justify-center">
      <section className="w-full max-w-lg md:max-w-xl flex items-center justify-center">
        <Card className="relative">
          <CardContent className="flex flex-col gap-y-6 justify-center items-center h-48 sm:px-6 md:px-8 lg:px-12">
            <p className="font-indieFlower text-3xl md:text-5xl text-sky-500">
              Page Not Found !
            </p>
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={backToHomeHandler}
                className="bg-sky-500 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-sky-600"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </div>
              <span className="text-sky-600 font-indieFlower font-xs">
                Back to home
              </span>
            </div>
          </CardContent>

          <div className="absolute h-24 w-24 -top-10 -right-10 md:h-32 md:w-32 md:-top-12 md:-right-10">
            <img
              src={chillGuyImage}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>
        </Card>
      </section>
    </main>
  );
};

export default NotFound;
