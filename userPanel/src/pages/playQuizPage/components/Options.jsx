import Show from "@/components/Show";
import { Skeleton } from "@/components/ui/skeleton";
import { validateAnswer } from "@/services/apiService";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import InputNameDialogBox from "./InputNameDialogBox";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/routes/routeConstant";

const Options = ({
  QUESTIONS_DATA,
  questionId,
  leaderBoardId,
  updateIndex,
  questionIsLoading,
  // badgeImage,
  // badgeName,
  totalQuestionCount,
  setPreviousBadgeData,
}) => {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
  const badgeData = useRef(null);
  const isLastQuestion = useRef(null);
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (questionIsLoading) {
  //     console.log("question array data", QUESTIONS_DATA);
  //   }
  // }, [QUESTIONS_DATA, questionIsLoading]);

  const openDialogBoxToInputName = () => {
    setIsDialogBoxOpen(true);
  };

  // useMutation hook for validating the answer
  const { mutate, isError, isSuccess, error, data } = useMutation(
    validateAnswer, // The function to call for the mutation
    {
      onSuccess: (data) => {
        if (data?.status) {
          badgeData.current = {
            badgeImage: data?.question?.badgeImage,
            badgeName: data?.question?.badgeName,
          };
          updateIndex((prev) => {
            if (prev === totalQuestionCount) {
              openDialogBoxToInputName();
              isLastQuestion.current = true;
              return totalQuestionCount;
            } else {
              return prev + 1;
            }
          });
        } else {
          openDialogBoxToInputName();
        }
      },
      onError: (error) => {
        console.error("Error validating answer:", error);
        toast({
          variant:"destructive",
          title: (
            <span className="font-indieFlower">
              "Uh oh! Something went wrong."
            </span>
          ),
          description: (
            <span className="font-indieFlower">
              "{error?.response?.data?.message}"
            </span>
          ),
        });
        navigate(ROUTES.HOME, {replace: true})
      },
    }
  );

  const optionClickHandler = (choosedOption) => {
    // console.log("clicked option->", choosedOption);

    mutate({ questionId, selectedOption: choosedOption, leaderBoardId });
  };

  return (
    <div className="w-full lg:w-[80%] flex flex-col md:flex-row gap-y-4 md:gap-x-2 mt-8">
      <Show
        when={questionIsLoading}
        fallback={[...Array(2)].map((_, index) => (
          <Skeleton key={index} className="w-full h-[10rem] md:h-[8rem]" />
        ))}
      >
        {QUESTIONS_DATA.map((item, index) => (
          <p
            key={item}
            className="w-full md:w-1/2 text-2xl flex gap-x-4 font-indieFlower cursor-pointer transition-all duration-100 ease-in-out hover:font-semibold"
            onClick={() => optionClickHandler(index + 1)}
          >
            <span className="font-semibold">{index === 0 ? "A)" : "B)"}</span>
            <span className="first-letter:capitalize">{item}</span>
          </p>
        ))}
      </Show>
      <InputNameDialogBox
        isOpen={isDialogBoxOpen}
        onOpenChange={setIsDialogBoxOpen}
        badgeImage={badgeData.current?.badgeImage}
        badgeName={badgeData.current?.badgeName}
        isLast={isLastQuestion.current}
      />
    </div>
  );
};

export default Options;
