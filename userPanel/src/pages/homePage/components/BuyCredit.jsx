import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import BuyCreditDialogBox from "./BuyCreditDialogBox";

const BuyCredit = ({ credit }) => {
  const [buyCreditIsOpen, setBuyCreditIsOpen] = useState(false);

  const buyCreditHandler = () => {
    console.log("user clicked to buy credit");
    setBuyCreditIsOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-x-4">
        <h2 className="text-xl capitalize">
          credits <span className="font-2xl">{credit}</span>
        </h2>
        {credit <= 10 && (
          <Button
            onClick={buyCreditHandler}
            size="sm"
            className="capitalize font-indieFlower"
          >
            buy credits
          </Button>
        )}
        <BuyCreditDialogBox
          isOpen={buyCreditIsOpen}
          onOpenChange={(open) => setBuyCreditIsOpen(open)}
        />
      </div>
    </>
  );
};

export default BuyCredit;
