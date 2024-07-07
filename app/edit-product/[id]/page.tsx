"use client";
import Input from "@/app/components/Elements/Input/Input";
import InputForm from "@/app/components/Elements/Input/InputForm";
import Header from "@/app/components/Fragements/Header/Header";
import { useFetchProduct } from "@/app/features/product/useFetchProduct";
import { useEditSale } from "@/app/features/sale/useEditSale";
import { useFetchSaleById } from "@/app/features/sale/useFetchSaleById";
import { DataPostSale } from "@/app/type/table";
import { saleSchema } from "@/app/utils/validationSale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { navigate } from "@/app/lib/redirect";
import React, { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FaTrashCan } from "react-icons/fa6";
import { useFetchSale } from "@/app/features/sale/useFetchSale";

const EditProduct = () => {
  const params = useParams();
  const { data } = useFetchSaleById(Number(params.id));
  const { refetch } = useFetchSale({});
  const { data: products } = useFetchProduct();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DataPostSale>({
    resolver: zodResolver(saleSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        transaction_date: new Date().toISOString().slice(0, 10),
        customer_name: data.customer_name,
        invoice_id: data.invoice_id,
        subtotal: data.subtotal,
        tax: data.tax,
        discount: data.discount,
        total_price: data.total_price,
        detail: data.detail.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }
  }, [data, reset]);

  const { fields, append, remove } = useFieldArray({
    name: "detail",
    control,
  });

  const onSubmit: SubmitHandler<DataPostSale> = async (data) => {
    data.detail = data.detail.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
      product_id: Number(item.product_id),
    }));
    console.log("data update", data);
    mutate({ data, id: Number(params.id) });
    // navigasikan ke halaman lain
  };
  const { mutate } = useEditSale({
    onSuccess: () => {
      refetch();
      navigate("/");
    },
  });
  const watchDetails = watch("detail", []);
  const watchTax = watch("tax");
  const watchDiscount = watch("discount");
  const newSubtotal = watchDetails.reduce(
    (acc, curr) => acc + (curr.price || 0) * (curr.quantity || 0),
    0
  );
  setValue("subtotal", newSubtotal);

  const taxValue = newSubtotal * (parseInt(watchTax) / 100);
  const discountValue =
    (newSubtotal + taxValue) * (parseInt(watchDiscount) / 100);
  setValue("total_price", newSubtotal + taxValue - discountValue);

  return (
    <div className="bg-white p-5 rounded-lg">
      <Header title="Edit Product" />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          <div className="w-1/4">
            <InputForm
              classNameInput="w-full"
              placeholder={"INV20240506"}
              name="invoice_id"
              required
              type="text"
              label="Invoice Id"
              register={register}
            />
            <input type="text" name="invoice_id" className="text-black" />
          </div>
          <div className="w-1/4">
            <InputForm
              classNameInput="w-full"
              placeholder={"name product"}
              required
              type="date"
              label="Date"
              name="transaction_date"
              register={register}
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-5 w-1/4">
            <InputForm
              classNameInput="w-full"
              name="customer_name"
              placeholder="Customer Name"
              required
              type="text"
              label="Customer"
              register={register}
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
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="h-2">
                <td colSpan={5}></td>
              </tr>
              {fields.map((row, index) => (
                <tr key={row.id}>
                  <td className="p-1">
                    <Controller
                      name={`detail.${index}.product_id`}
                      control={control}
                      defaultValue={row.product_id} // Set default value here
                      render={({ field }) => (
                        <select
                          {...field}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  py-2 px-3"
                          onChange={(e) => {
                            field.onChange(e);
                            const selectedProduct = products?.find(
                              (product) => product.id === Number(e.target.value)
                            );
                            setValue(
                              `detail.${index}.price`,
                              selectedProduct?.price || 0
                            );
                          }}
                        >
                          <option value="">Select Product</option>
                          {products?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </td>
                  <td className="p-1">
                    <Controller
                      name={`detail.${index}.price`}
                      control={control}
                      render={({ field }) => (
                        <Input type="number" readonly {...field} />
                      )}
                    />
                  </td>
                  <td className="p-1">
                    <Controller
                      name={`detail.${index}.quantity`}
                      control={control}
                      render={({ field }) => <Input type="number" {...field} />}
                    />
                  </td>
                  <td className="p-1">
                    <Input
                      type="number"
                      readonly
                      value={
                        watchDetails[index]?.price *
                          watchDetails[index]?.quantity || 0
                      }
                    />
                  </td>
                  <td className="p-1">
                    <div className="flex justify-center items-center">
                      {index > 1 && (
                        <FaTrashCan
                          size={20}
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-800 cursor-pointer"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white w-full rounded-lg p-1 hover:bg-blue-800"
          onClick={() => append({ product_id: 0, quantity: 1, price: 0 })}
        >
          Add Row
        </button>
        <div className="flex items-end justify-end">
          <div className="w-4/12 flex flex-col gap-2 justify-between ">
            <InputForm
              label="Sub Total : "
              name="subtotal"
              type="string"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4"
              classNameLabel="w-1/4"
              readonly
              register={register}
            />
            <InputForm
              label="Pajak :"
              name="tax"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4"
              classNameLabel="w-1/4"
              register={register}
            />
            <InputForm
              label="diskon :"
              name="discount"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4"
              classNameLabel="w-1/4"
              register={register}
            />
            <InputForm
              label="Grand Total :"
              name="total_price"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4"
              classNameLabel="w-1/4"
              readonly
              register={register}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-800 text-white w-1/2 mt-3 rounded-lg p-1"
                onClick={() => reset()}
              >
                Reset
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-800 text-white w-1/2 mt-3 rounded-lg p-1"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
