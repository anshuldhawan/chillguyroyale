import Show from "@/components/Show";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const QuestionWithImage = ({ imageSrc, question, questionIsLoading }) => {
  return (
    <>
      <Show
        when={questionIsLoading}
        fallback={
          <Skeleton className="w-full md:w-[26rem] lg:w-[26rem] xl:w-[26rem] h-[18rem]" />
        }
      >
        <div className="w-full md:w-[26rem] lg:w-[26rem] xl:w-[26rem] min-h-[10rem] h-full bg-gray-300 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={`Image for "${question}"`}
            className="object-contain w-full h-full text-center font-indieFlower"
          />
        </div>
      </Show>
      <Show
        when={questionIsLoading}
        fallback={<Skeleton className="w-full h-[10rem] md:h-[6rem]" />}
      >
        <p className="text-2xl md:text-3xl font-indieFlower font-medium w-full text-center">
          {question}
        </p>
      </Show>
    </>
  );
};

export default QuestionWithImage;
