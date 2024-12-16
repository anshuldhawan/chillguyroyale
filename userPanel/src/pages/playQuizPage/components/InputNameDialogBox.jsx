import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { updateName } from "@/services/apiService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routeConstant";
import { Button } from "@/components/ui/button";
import { useIsFirstRender } from "@/hooks/useIsFirstRender";
import ShareOnTwitter from "@/components/ShareOnTwitter";

const InputNameDialogBox = ({
  isOpen,
  onOpenChange,
  badgeName,
  badgeImage,
  isLast,
}) => {
  const navigate = useNavigate();

  // custom hook
  const isFirstRender = useIsFirstRender();

  const mutation = useMutation(updateName, {
    onSuccess: (data) => {
      console.log("Name updated successfully:", data);
      navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error) => {
      console.error("Error updating name:", error);
      // Handle error case
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here, such as API calls or state updates
    mutation.mutate(data.name);
  };

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    if (!isOpen) {
      navigate(ROUTES.HOME);
    }
  }, [isOpen]);

  const currentUrl = "https://chillguyroyale.com";
  const tweetText = `I'm a ${badgeName} in Chill Guy Royale. Check it out ! #chillguyroyale`;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90%] sm:w-full sm:max-w-xs md:w-full md:max-w-md lg:w-full lg:max-w-lg xl:w-full xl:max-w-xl h-auto px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6">
          <DialogHeader>
            <DialogDescription className="text-sm text-center text-sky-800 font-indieFlower">
              {badgeName ? (
                isLast ? (
                  
                  <span className="text-xl text-center text-sky-500 capitalize font-indieFlower">
                    <strong>Congratulations! 🎉</strong><br/> You are a{" "}
                    <span className="text-xl font-bold">{badgeName}</span> ! 🏆
                  </span>
                ) : (
                  <span className="text-xl text-center text-sky-500 capitalize font-indieFlower" >
                    <strong>Wrong answer, your streak ended. 😔</strong><br/> You are a{" "}
                    <span className="text-xl font-bold">{badgeName}</span>{" "}
                  </span>
                )
              ) : (
                <span>
                  <strong>Oops! 😔</strong> Better luck next time!
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-y-4">
            <div className="flex justify-center">
              {badgeImage && (
                <div className="h-36 w-36 rounded-full flex items-center justify-center">
                  <img
                    src={badgeImage}
                    alt={`${badgeName} Badge`}
                    className="w-full h-full object-contain rounded-full shadow-inner hover:scale-110 transition-all duration-300"
                  />
                </div>
              )}
            </div>
            <ShareOnTwitter text={tweetText} url={currentUrl} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <div>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                  })}
                  className="w-full p-2 border border-sky-300 rounded-md font-indieFlower"
                />
                {/* Error Message */}
                {errors.name && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full font-indieFlower">
                Submit
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InputNameDialogBox;
