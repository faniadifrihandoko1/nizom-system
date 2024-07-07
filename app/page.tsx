"use client";
import React from "react";
import { DataTable, DataTables } from "./type/table";
import dataTable from "./mocks/dataTable";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoFilter, IoSearchSharp } from "react-icons/io5";
import Tabel from "./components/Fragements/Tabel";
import SelectLimit from "./components/Fragements/SelectLimit";
import { useQuery } from "@tanstack/react-query";
import { useFetchSale } from "./features/sale/useFetchSale";
import HomePage from "./home/page";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
