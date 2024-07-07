"use client";
import Input from "@/app/components/Elements/Input/Input";
import InputForm from "@/app/components/Elements/Input/InputForm";
import Header from "@/app/components/Fragements/Header/Header";
import { useFetchProduct } from "@/app/features/product/useFetchProduct";
import { useFetchSaleById } from "@/app/features/sale/useFetchSaleById";
import { useParams } from "next/navigation";
import React from "react";

const DetailProduct = () => {
  const params = useParams();
  const { data } = useFetchSaleById(Number(params.id));
  const { data: product } = useFetchProduct();
  return (
    <div className="bg-white p-5 rounded-lg">
      <Header title="Detail Product" />
      <form className="flex flex-col ">
        <div className="flex justify-between gap-5">
          <div className="w-1/3">
            <InputForm
              classNameInput="w-full  bg-slate-300"
              placeholder={"INV20240506"}
              name="invoice_id"
              readonly
              required
              type="text"
              label="Invoice Id"
              value={data?.invoice_id}
            />
            <input type="text" name="invoice_id" className="text-black" />
          </div>
          <div className="w-1/3">
            <InputForm
              classNameInput="w-full bg-slate-300"
              placeholder={"name product"}
              required
              type="date"
              label="Date"
              name="transaction_date"
              value={
                data?.transaction_date
                  ? new Date(data.transaction_date).toISOString().slice(0, 10)
                  : ""
              }
            />
          </div>
          <div className="mb-5 w-1/3 ">
            <InputForm
              classNameInput="w-full bg-slate-300"
              name="customer_name"
              placeholder="Customer Name"
              required
              type="text"
              label="Customer"
              value={data?.customer_name}
            />
          </div>
        </div>

        <div className="overflow-x-auto relative">
          <table className="table-auto w-full">
            <thead className="text-sm uppercase text-gray-400 border-b pb-3">
              <tr>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Product</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Price</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Qty</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Total</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm  ">
              <tr className="h-2">
                <td colSpan={5}></td>
              </tr>
              {data?.detail.map((row) => (
                <tr key={row.id}>
                  <td className="p-1">
                    {
                      product?.find((product) => product.id === row.product_id)
                        ?.name
                    }
                  </td>
                  <td className="p-1">
                    {" "}
                    <Input
                      type="number"
                      className="bg-slate-300"
                      readonly
                      value={row.price}
                    />
                  </td>
                  <td className="p-1">
                    <Input
                      type="number"
                      className="bg-slate-300"
                      readonly
                      value={row.quantity}
                    />
                  </td>
                  <td className="p-1">
                    <Input
                      type="number"
                      className="w-full bg-slate-300"
                      readonly
                      value={row.price * row.quantity}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-end justify-end border-t-2 pt-5 mt-3">
          <div className="w-4/12 flex flex-col gap-2 justify-between ">
            <InputForm
              label="Sub Total : "
              name="subtotal"
              type="string"
              classNameParent="flex items-center justify-between "
              classNameInput="w-3/4 bg-slate-300"
              classNameLabel="w-1/4"
              readonly
              value={data?.subtotal}
            />
            <InputForm
              label="Pajak :"
              name="tax"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4 bg-slate-300"
              classNameLabel="w-1/4"
              value={data?.tax}
            />
            <InputForm
              label="diskon :"
              name="discount"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4 bg-slate-300"
              classNameLabel="w-1/4"
              value={data?.discount}
            />
            <InputForm
              label="Grand Total :"
              name="total_price"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4 bg-slate-300"
              classNameLabel="w-1/4"
              readonly
              value={data?.total_price}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailProduct;
