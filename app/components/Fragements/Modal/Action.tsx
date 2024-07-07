import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<number | null>>;
};

const Action = ({ id, setModalDelete, setDeleteId }: Props) => {
  return (
    <div className="absolute -top-5 right-0 text-xs flex flex-col bg-white z-50 border border-gray-300 shadow-lg rounded-md">
      <Link
        href={`/detail-product/${id}`}
        className="p-2 hover:bg-gray-200 cursor-pointer"
      >
        Detail
      </Link>
      <Link
        href={`/edit-product/${id}`}
        className="p-1 hover:bg-gray-200 cursor-pointer"
      >
        Edit
      </Link>
      <div
        onClick={() => {
          setModalDelete(true);
          setDeleteId(id);
        }}
        className="p-1 hover:bg-gray-200 cursor-pointer"
      >
        Delete
      </div>
    </div>
  );
};

export default Action;
