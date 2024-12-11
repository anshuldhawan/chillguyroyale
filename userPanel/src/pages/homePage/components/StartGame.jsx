import { CustomWalletMultiButton } from "@/components/CustomWalletMultiButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/routes/routeConstant";
import { leaderBoard, startGame } from "@/services/apiService";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StartGame = ({ isLoginLoader, token, handleNotEnoughCredit }) => {
  const navigate = useNavigate();

  // Initialize the startGame mutation
  const mutation = useMutation(startGame, {
    onSuccess: (data) => {
      navigate(ROUTES.PLAYQUIZ, {
        state: { leaderBoardId: data.leaderBoard._id },
      });
    },
    onError: (error) => {
      // Handle login error
      console.error("start game failed:", error);
      toast({
        title: (
          <span className="font-indieFlower">
            "Uh oh! Something went wrong."
          </span>
        ),
        description: (
          <span className="font-indieFlower text-lg text-red-500">{`"${error?.response?.data?.message}"`}</span>
        ),
      });
      handleNotEnoughCredit(true);
    },
  });

  const handleStartGame = () => {
    mutation.mutate();
  };

  return (
    <>
      {/* Tooltip provider wraps the whole tooltip logic */}
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <Button
              size="lg"
              onClick={handleStartGame}
              className="text-lg font-indieFlower flex gap-x-2 items-center"
              disabled={!token || mutation.isLoading}
            >
              {isLoginLoader && <Loader2 className="animate-spin" />}
              {mutation.isLoading ? "Starting game..." : "Start game"}
            </Button>
          </TooltipTrigger>

          {/* Tooltip content */}
          {!token && (
            <TooltipContent className="bg-sky-100">
              <p className="font-indieFlower text-sky-500">
                Please connect your wallet.
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default StartGame;
