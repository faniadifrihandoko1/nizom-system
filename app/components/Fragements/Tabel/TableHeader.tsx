import React from "react";

const TableHeader: React.FC = () => {
  return (
    <thead className="text-sm font-ibold uppercase text-gray-400 border-b">
      <tr>
        <th className="p-1 whitespace-nowrap">
          <div className="font-semibold text-left">Date</div>
        </th>
        <th className="p-1 whitespace-nowrap">
          <div className="font-semibold text-left">No. Invoice</div>
        </th>
        <th className="p-1 whitespace-nowrap">
          <div className="font-semibold text-left">Customer</div>
        </th>
        <th className="p-1 whitespace-nowrap">
          <div className="font-semibold text-center">QTY</div>
        </th>
        <th className="p-1 whitespace-nowrap">
          <div className="font-semibold text-center">Total Harga</div>
        </th>
        <th className="p-1 whitespace-nowrap">
          <div className="font-semibold text-center">ACTION</div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
