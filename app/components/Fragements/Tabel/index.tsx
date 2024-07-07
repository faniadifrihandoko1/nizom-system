import React from "react";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { DataTables } from "@/app/type/table";

interface DataTableProps {
  data: DataTables[];
}

const Tabel: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table className="table-auto w-full ">
      <TableHeader />
      <TableBody data={data} />
    </table>
  );
};

export default Tabel;
