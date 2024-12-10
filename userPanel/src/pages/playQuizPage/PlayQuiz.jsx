import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { QUESTIONS_DUMMY_DATA } from "@/data/DummyData";
import Options from "./components/Options";
import ChillGuyLogo from "@/components/ChillGuyLogo";
import QuestionWithImage from "./components/QuestionWithImage";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getQuestion, totalQuestion } from "@/services/apiService";
import cryptoJs from "crypto-js";
import { ROUTES } from "@/routes/routeConstant";

const PlayQuiz = () => {
  const location = useLocation();
  const { leaderBoardId } = location.state || {};
  const [index, setIndex] = useState(1);
  const [previousBadgeData, setPreviousBadgeData] = useState({});
  const navigate = useNavigate();

  const handleEncrypt = (secretKey) => {
    console.log("secretKey", secretKey);

    const encrypted = cryptoJs.AES.encrypt(
      String(secretKey),
      import.meta.env.VITE_PASS_PHARSE
    ).toString();
    return encrypted;
  };

  // Fetch the total number of questions, but only if leaderBoardId is present
  const {
    data: totalQuestionData,
    error: totalQuestionError,
    isLoading: totalQuestionIsLoading,
    isFetching: totalQuestionIsFetching,
  } = useQuery(
    ["totalQuestion"], // Unique query key
    totalQuestion, // The function to fetch data
    {
      enabled: !!leaderBoardId, // Query will only run if leaderBoardId is available
      refetchOnWindowFocus: false, // Disable refetching when window gains focus
    }
  );

  const {
    data: getQuestionData,
    error: getQuestionError,
    isLoading: getQestionIsLoading,
    isFetching: getQuestionIsFetching,
  } = useQuery(
    ["question", index],
    () => {
      return getQuestion({ index: handleEncrypt(index), leaderBoardId });
    },
    {
      enabled: !!index && index !== 0 && !!leaderBoardId, // Ensures the query doesn't run if either value is missing
      refetchOnWindowFocus: false, // Disable refetching when window gains focus
    }
  );

  useEffect(() => {
    // Check if the page has been reloaded
    const isReloaded = sessionStorage.getItem("isReloaded");

    console.log("isReloaded", isReloaded);

    if (isReloaded) {
      // If the page was reloaded, clear the flag and navigate to home
      sessionStorage.removeItem("isReloaded");
      navigate(ROUTES.HOME, { replace: true });
    } else {
      // Set the flag to indicate that a reload will happen
      sessionStorage.setItem("isReloaded", "true");
    }

    return () => {
      sessionStorage.removeItem("isReloaded");
    };
  }, [navigate]);

  return (
    <>
      <main className="min-w-screen min-h-screen bg-gradient-to-br from-sky-300 to-sky-200 p-4 md:p-6 lg:p-8 xl:p-12">
        <Card className="relative border border-blue-300 h-full w-full bg-white">
          <CardContent className="flex flex-col items-center gap-y-8 px-1.5 md:px-6 py-6 justify-between">
            <h2 className="text-2xl md:text-4xl font-indieFlower">
              current streak:{" "}
              <span className="font-2xl">{index === 0 ? "0" : index - 1}</span>
            </h2>

            <Card className="w-full md:w-full md:max-w-5xl">
              <CardContent className="flex flex-col gap-y-6 justify-center items-center px-6 py-8">
                <QuestionWithImage
                  imageSrc={getQuestionData?.question.image}
                  question={getQuestionData?.question.question}
                  questionIsLoading={!getQuestionIsFetching}
                />
              </CardContent>
            </Card>

            <Options
              QUESTIONS_DATA={
                getQuestionData?.question
                  ? [
                      getQuestionData?.question.option1,
                      getQuestionData?.question.option2,
                    ]
                  : []
              }
              questionId={getQuestionData?.question._id}
              questionIsLoading={!getQuestionIsFetching}
              leaderBoardId={leaderBoardId}
              updateIndex={setIndex}
              totalQuestionCount={totalQuestionData?.totalCount}
              setPreviousBadgeData={setPreviousBadgeData}
            />
          </CardContent>
          <CardFooter></CardFooter>
          <ChillGuyLogo />
        </Card>

        <footer></footer>
      </main>
    </>
  );
};

export default PlayQuiz;
