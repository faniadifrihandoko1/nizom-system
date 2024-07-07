import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DataTables } from "@/app/type/table";
import formatDate from "@/app/utils/formatDate";
import Link from "next/link";
import DeleteModal from "../Modal/Delete";
import { useDeleteSale } from "@/app/features/sale/useDeleteSale";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import formatRupiah from "@/app/utils/formatRupiah";
import Action from "../Modal/Action";
import { useFetchSale } from "@/app/features/sale/useFetchSale";

interface TableRowProps {
  data: DataTables;
  openModalId: number | null;
  handleOpenModal: (id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  openModalId,
  handleOpenModal,
}) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const isModalOpen = openModalId === data.id;
  const queryClient = useQueryClient();
  const { mutate } = useDeleteSale({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch.sale"] });
      alert("Data deleted successfully");
      setModalDelete(false);
      handleThreeDotsClick();
    },
    onError: () => {
      setModalDelete(false);
    },
  });

  const handleDelete = (id: number | null) => {
    if (id !== null) {
      console.log("Data deleted, id:", id);
      mutate(id);
    }
  };

  const handleThreeDotsClick = () => {
    handleOpenModal(data.id);
  };

  return (
    <>
      <tr key={data.id}>
        <td className="py-3 px-1 whitespace-nowrap">
          <div className="text-gray-800 text-left">
            {formatDate(data.transaction_date)}
          </div>
        </td>
        <td className="p-3 px-1 whitespace-nowrap">
          <div className="text-left">{data.invoice_id}</div>
        </td>
        <td className="p-3 px-1 whitespace-nowrap">
          <div className="text-left text-gray-800">{data.customer_name}</div>
        </td>
        <td className="p-3  whitespace-nowrap">
          <div className="text-center text-gray-800">
            {data?.detail?.length}
          </div>
        </td>
        <td className="p-3 whitespace-nowrap">
          <div className="text-center text-gray-800">
            {formatRupiah(data.total_price)}
          </div>
        </td>
        <td className="p-3 whitespace-nowrap relative">
          <div className="text-lg text-center flex justify-center">
            <BsThreeDotsVertical
              size={20}
              className="cursor-pointer text-red-700 hover:text-red-950"
              onClick={handleThreeDotsClick}
            />
            {isModalOpen && (
              <Action
                id={data.id}
                setDeleteId={setDeleteId}
                setModalDelete={setModalDelete}
              />
            )}
          </div>
        </td>
      </tr>
      <DeleteModal
        isOpen={modalDelete}
        onClose={() => {
          setModalDelete(false);
          handleThreeDotsClick();
        }}
        onDelete={() => handleDelete(deleteId)}
      />
    </>
  );
};

export default TableRow;
