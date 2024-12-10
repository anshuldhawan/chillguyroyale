import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const Columns = (buyCreditHandler, isLoader = false) => {
  return [
    {
      accessorKey: "_id",
      header: () => (
        <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
          id
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-sky-800 capitalize text-lg text-center font-indieFlower font-medium">
            {row?.getValue("_id")}
          </div>
        );
      },
    },
    {
      accessorKey: "currency",
      header: () => (
        <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
          currency
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-sky-600 capitalize text-lg text-center font-indieFlower font-medium">
            {row?.getValue("currency")}
          </div>
        );
      },
    },
    {
      accessorKey: "amountIn",
      header: () => (
        <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
          amount
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-sky-600 capitalize text-lg text-center font-indieFlower font-medium">
            {row?.getValue("amountIn")}
          </div>
        );
      },
    },

    {
      accessorKey: "credit",
      header: () => (
        <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
          credits
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-sky-600 capitalize text-lg text-center font-indieFlower font-medium">
            {row?.getValue("credit")}
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => {
        return null;
      },
      cell: ({ row }) => {
        return (
          <div className="text-sky-600 capitalize text-lg text-center font-indieFlower font-medium">
            <Button
              size="sm"
              className="capitalize font-indieFlower"
              onClick={() => {
                buyCreditHandler(
                  row?.getValue("currency"),
                  row?.getValue("amountIn"),
                  row?.getValue("credit")
                );
              }}
              disabled={isLoader}
            >
              {isLoader ? (
                <span className="flex items-center gap-x-2">
                  <Loader2 className="animate-spin" />
                  buying...
                </span>
              ) : (
                "buy credits"
              )}
            </Button>
          </div>
        );
      },
    },
  ];
};
