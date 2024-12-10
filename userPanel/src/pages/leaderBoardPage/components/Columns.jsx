export const Columns = [
  {
    accessorKey: "_id",
    header: () => (
      <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
        id
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sky-800 capitalize text-lg text-center font-indieFlower font-normal">
          {row?.getValue("_id")}
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: () => (
      <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
        name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sky-800 capitalize text-lg text-center font-indieFlower font-normal">
          {row?.getValue("userId").name}
        </div>
      );
    },
  },
  {
    accessorKey: "badge",
    header: () => (
      <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
        badge name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sky-800 capitalize text-lg text-center font-indieFlower font-normal">
          {row?.getValue("badge")}
        </div>
      );
    },
  },
  {
    accessorKey: "badgeImage",
    header: () => (
      <div className="text-center uppercase text-base text-white font-indieFlower font-bold">
        badge
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sky-800 text-lg flex items-center justify-center font-indieFlower">
          <div className="h-6 w-6 rounded-full flex justify-center items-center">
            <img
              src={row?.getValue("badgeImage")}
              alt=""
              className="w-full h-full object-contain rounded-full shadow-inner"
            />
          </div>
        </div>
      );
    },
  },
];
