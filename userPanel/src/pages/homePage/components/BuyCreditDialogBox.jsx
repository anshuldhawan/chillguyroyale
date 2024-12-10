import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreditPackageTable from "./CreditPackageTable";

const BuyCreditDialogBox = ({ isOpen, onOpenChange }) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90%] sm:w-full sm:max-w-xs md:w-full md:max-w-md lg:w-full lg:max-w-lg xl:w-full xl:max-w-xl h-full max-h-[30rem] px-1  sm:px-2 md:px-3 lg:px-4 xl:px-6">
          <DialogHeader>
            <DialogTitle className="text-xl xl:text-2xl text-center text-sky-500 capitalize font-indieFlower">
              credit packages
            </DialogTitle>
            <DialogDescription className="text-sm text-center text-sky-400 font-indieFlower">
              Purchase credits to keep playing.
            </DialogDescription>
          </DialogHeader>
          <CreditPackageTable onDialogBoxClose={onOpenChange}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyCreditDialogBox;
