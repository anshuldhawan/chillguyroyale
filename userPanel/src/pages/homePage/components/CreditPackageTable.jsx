import React, { useState } from "react";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { buyCredit, getCreditPackage } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Loader2 } from "lucide-react";
import { useTokenTransfer } from "@/hooks/useTokenTransfer";
import { toast } from "@/hooks/use-toast";

const CreditPackageTable = ({ onDialogBoxClose }) => {
  const [columnVisibility, setColumnVisibility] = useState({
    _id: false, // set ID column visibility to false (hidden)
  });
  const queryClient = useQueryClient();

  const {
    transferSOL,
    transferChillGuy,
    isloading: transferTokenIsLoader,
    error,
  } = useTokenTransfer();

  // Initialize the user login mutation
  const mutation = useMutation(buyCredit, {
    onSuccess: (data) => {
      console.log("Credit API called data-->", data);
      toast({
        title: (
          <span className="font-indieFlower text-green-500">
            Credit Purchased Successfully!
          </span>
        ),
      });
      onDialogBoxClose();
      // Invalidate related queries (replace 'credits' with your actual query key)
      queryClient.invalidateQueries("credits");
    },
    onError: (error) => {
      // Handle login error
      console.error("Credit API error:", error);
      toast({
        variant: "destructive",
        title: (
          <span className="font-indieFlower">
            "Uh oh! Something went wrong."
          </span>
        ),
        description: (
          <span className="font-indieFlower">
            "There was a problem when buying credits."
          </span>
        ),
      });
    },
  });

  const buyCreditHandler = async (currency, amountIn, credit) => {
    console.log("currency", currency);
    console.log("amountIn", amountIn);
    console.log("credit", credit);

    let signature = "";

    if (currency.toLowerCase() === "sol") {
      signature = await transferSOL(amountIn);
    } else {
      signature = await transferChillGuy(amountIn);
    }

    if (signature) {
      mutation.mutate({
        currency: currency,
        amountIn: amountIn,
        credit: credit,
        transactionHash: signature,
      });
    } else {
      toast({
        variant: "destructive",
        title: (
          <span className="font-indieFlower">
            "Uh oh! Something went wrong."
          </span>
        ),
        description: <span className="font-indieFlower">{error}</span>,
      });
    }
  };

  const {
    data: getCreditPackageData,
    error: getCreditPackageError,
    isLoading: getCreditPackageIsLoading,
    isError: getCreditPackageIsError,
  } = useQuery(["creditPackage"], getCreditPackage, {
    refetchOnWindowFocus: false, // Disable refetching when window gains focus
  });

  const table = useReactTable({
    data: getCreditPackageData?.credit || [],
    columns: Columns(buyCreditHandler, mutation.isLoading),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  // console.log("getCreditPackageData-->",getCreditPackageData)

  return (
    // transferTokenIsLoader
    <>
      {transferTokenIsLoader && (
        <div className="absolute z-40 bg-black/50 w-full h-full">
          <Loader2 className="animate-spin text-sky-300 absolute top-1/2 left-1/2" />
        </div>
      )}
      <DataTable columns={Columns} isFetching={false} table={table} />
    </>
  );
};

export default CreditPackageTable;
