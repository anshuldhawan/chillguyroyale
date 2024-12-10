import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useQuery } from "react-query";
import { leaderBoard } from "@/services/apiService";
import { toast } from "@/hooks/use-toast";

const LeaderBoardTable = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    _id: false, // set ID column visibility to false (hidden)
  });

  const { data, error, isLoading, isError } = useQuery([""], leaderBoard);

  useEffect(() => {
    if (isError) {
      toast({
        title: (
          <span className="font-indieFlower">
            "Uh oh! Something went wrong."
          </span>
        ),
        description: (
          <span className="font-indieFlower">
            "There was a problem with your request."
          </span>
        ),
      });
    }
  }, [isError]);

  const table = useReactTable({
    data: data?.leaderboard || [],
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <>
      <DataTable columns={Columns} isFetching={isLoading} table={table} />
    </>
  );
};

export default LeaderBoardTable;
