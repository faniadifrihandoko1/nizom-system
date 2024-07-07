import React, { useContext, useState } from "react";

import { DataTables } from "@/app/type/table";
import TableRow from "./TableRow";

interface TableBodyProps {
  data: DataTables[];
}

const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setOpenModalId(openModalId === id ? null : id);
  };
  return (
    <tbody className="text-sm divide-y divide-gray-100 font-semibold ">
      {data.map((value: DataTables) => (
        <TableRow
          key={value.id}
          data={value}
          openModalId={openModalId}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
