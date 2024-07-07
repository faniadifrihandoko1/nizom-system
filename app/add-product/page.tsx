"use client";
import React from "react";

import InputForm from "../components/Elements/Input/InputForm";
import Input from "../components/Elements/Input/Input";
import { FaTrashCan } from "react-icons/fa6";
import { useFetchProduct } from "../features/product/useFetchProduct";
import { DataPostSale } from "../type/table";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from "react-hook-form";
import { useCreateSale } from "../features/sale/useCreateSale";

import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../components/Fragements/Header/Header";
import { useFetchSale } from "../features/sale/useFetchSale";
import { saleSchema } from "../utils/validationSale";
import { ToastContainer, toast } from "react-toastify";
import { navigate } from "../lib/redirect";

const AddProduct = () => {
  const { refetch } = useFetchSale({});
  const { data: products } = useFetchProduct();
  const notify = () => toast("Created Successfully");

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
    defaultValues: {
      transaction_date: new Date().toISOString().slice(0, 10),
      customer_name: "",
      invoice_id: "",
      subtotal: 0,
      tax: "",
      discount: "",
      total_price: 0,
      detail: [
        {
          product_id: 0,
          quantity: 1,
          price: 0,
        },
      ],
    },
  });

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

    mutate(data);
  };

  const { mutate } = useCreateSale({
    onSuccess: () => {
      notify();
      refetch();
      navigate("/");
    },
  });
  const watchDetails = watch("detail");
  const watchTax = watch("tax");
  const watchDiscount = watch("discount");

  const newSubtotal = watchDetails.reduce(
    (acc, curr) => acc + (curr.price || 0) * (curr.quantity || 0),
    0
  );
  setValue("subtotal", newSubtotal);

  const tax = newSubtotal * (parseInt(watchTax) / 100 || 0);
  const discount = (newSubtotal + tax) * (parseInt(watchDiscount) / 100 || 0);
  const totalPrice = newSubtotal + tax - discount;

  setValue("total_price", isNaN(totalPrice) ? 0 : totalPrice);

  return (
    <div className="bg-white p-5 rounded-lg">
      <Header title="Add Product" />
      <ToastContainer />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          <div className="w-1/4">
            <InputForm
              classNameInput="w-full"
              placeholder={"INV20240506"}
              name="invoice_id"
              type="text"
              label="Invoice Id"
              required
              register={register}
            />
            {errors.invoice_id && (
              <p className="text-red-500 text-xs">
                {errors.invoice_id.message}
              </p>
            )}
          </div>
          <div className="w-1/4">
            <InputForm
              classNameInput="w-full"
              placeholder={"name product"}
              type="date"
              label="Date"
              name="transaction_date"
              register={register}
              required
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-5 w-1/4">
            <InputForm
              classNameInput="w-full"
              name="customer_name"
              placeholder="Customer Name"
              type="text"
              label="Customer"
              register={register}
              required
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
                          <option value={0}>Select Product</option>
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
                      type="number w-full"
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
        {errors.detail?.root?.message && (
          <p className="text-red-500 text-xs text-left">
            {errors.detail?.root?.message}
          </p>
        )}
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
            {errors.tax && (
              <p className="text-red-500 text-xs text-right">
                {errors.tax.message}
              </p>
            )}
            <InputForm
              label="diskon :"
              name="discount"
              type="text"
              classNameParent="flex items-center justify-between"
              classNameInput="w-3/4"
              classNameLabel="w-1/4"
              register={register}
            />
            {errors.discount && (
              <p className="text-red-500 text-xs text-right">
                {errors.discount.message}
              </p>
            )}
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
