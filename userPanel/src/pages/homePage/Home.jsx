import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import chillGuyImage from "@/assets/images/chill-guy.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routeConstant";
import BuyCredit from "./components/BuyCredit";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Show from "@/components/Show";
import { useMutation, useQuery } from "react-query";
import { getUser, userLogin } from "@/services/apiService";
import { useBoundStore } from "@/store/store";
import base58 from "bs58";
import StartGame from "./components/StartGame";
import { useIsFirstRender } from "@/hooks/useIsFirstRender";
import Footer from "@/components/ui/Footer";
import { CustomWalletMultiButton } from "@/components/CustomWalletMultiButton";

const currentStreak = 0;

const Home = () => {
  const [isLoginLoader, setIsLoginLoader] = useState(false);
  const navigate = useNavigate();
  const [isNotEnoughCredit, setIsNotEnoughCredit] = useState(false);

  const {
    publicKey,
    connect,
    disconnect,
    connecting,
    connected,
    signMessage,
    visible,
  } = useWallet();

  // from zustand
  const addToken = useBoundStore((state) => state.addToken);
  const addUser = useBoundStore((state) => state.addUser);
  const removeToken = useBoundStore((state) => state.removeToken);
  const removeUser = useBoundStore((state) => state.removeUser);
  const token = useBoundStore((state) => state.token);

  // custom hook
  const isFirstRender = useIsFirstRender();

  // get user query
  const {
    data: getUserData,
    error: getUserError,
    isLoading: getUserIsLoading,
    isError: getUserIsError,
    isFetching: getUserIsFetching,
  } = useQuery(["credits"], getUser, {
    enabled: !!token, // Query will only run if token is available
  });

  useEffect(() => {
    if (connected && !token) {
      handleSignMessage();
    }
  }, [connected, token]);

  const handleDisconnet = () => {
    disconnect();
    removeToken();
    removeUser();
  };

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    if (!visible && !publicKey && !connecting) {
      handleDisconnet();
    }
  }, [visible, publicKey, connecting, isFirstRender]);

  const navigateLeaderBoard = () => {
    navigate(ROUTES.LEADERBOARD);
  };

  // Initialize the user login mutation
  const mutation = useMutation(userLogin, {
    onSuccess: (data) => {
      console.log("Login successful data-->", data);

      addToken(data.token);
      addUser(data.user);
    },
    onError: (error) => {
      // Handle login error
      console.error("Login failed:", error);
      handleDisconnet();
    },
  });

  async function handleSignMessage() {
    setIsLoginLoader(true);

    if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }

    try {
      const message = new TextEncoder().encode(
        "Please sign this message to connect to ChillGuy"
      );

      const signedMessage = await signMessage(message);

      mutation.mutate({
        publicKey: publicKey?.toString(),
        signature: base58.encode(signedMessage),
      });

      setIsLoginLoader(false);
    } catch (error) {
      console.error("Failed to sign message:", error);
      setIsLoginLoader(false);
      handleDisconnet();
    }
  }

  const handleNotEnoughCredit = (value) => {
    setIsNotEnoughCredit(true);
  };

  const handleBuyChillGuyButton = () => {
    window.open("https://www.chillguy.io/", "_blank"); // Opens in a new tab
  };

  return (
    <>
      <main className="w-screen h-screen bg-gradient-to-br from-sky-300 to-sky-200 space-y-10 overflow-hidden relative">
        <header className="h-20 w-full flex gap-x-4 justify-end items-center px-4">
          <Button
            variant="outline"
            className="text-base font-indieFlower"
            onClick={navigateLeaderBoard}
          >
            LeaderBoard
          </Button>
          <Button
            variant="outline"
            className="text-base font-indieFlower"
            onClick={handleBuyChillGuyButton}
          >
            <img
              src={chillGuyImage}
              alt="chillGuy"
              className="w-full h-full object-contain"
            />
            Buy ChillGuy{" "}
          </Button>
          <CustomWalletMultiButton />
        </header>
        <section className="mx-auto max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-xl ">
          <Card className="relative">
            <CardContent className="flex flex-col items-center py-6 justify-between h-96">
              <div className="text-xl capitalize font-indieFlower">
                <Show when={publicKey?.toString() && token}>
                  <BuyCredit
                    credit={getUserData?.user?.credits}
                    isNotEnoughCredit={isNotEnoughCredit}
                    setIsNotEnoughCredit={() => setIsNotEnoughCredit(false)}
                  />
                </Show>
                <h2 className="text-xl capitalize font-indieFlower">
                  current streak{" "}
                  <span className="font-2xl">{currentStreak}</span>
                </h2>
              </div>

              <p className="font-indieFlower text-lg">
                Ready to start? click to start game!
              </p>
              <StartGame
                token={token}
                isLoginLoader={isLoginLoader}
                handleNotEnoughCredit={handleNotEnoughCredit}
              />
            </CardContent>
            <CardFooter></CardFooter>
            <div className="absolute h-16 w-16 -top-4 -right-4 sm:h-20 sm:w-20 sm:-top-6 sm:-right-6 md:h-24 md:w-24 md:-top-6 md:-right-6 lg:h-28 lg:w-28 lg:-top-6 lg:-right-8 xl:h-32 xl:w-32 xl:-top-12 xl:-right-12">
              <img
                src={chillGuyImage}
                alt="chill guy logo"
                className="object-contain w-full h-full"
              />
            </div>
          </Card>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Home;
