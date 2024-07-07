"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useFetchSale } from "../features/sale/useFetchSale";
import SelectLimit from "../components/Fragements/SelectLimit";
import { IoFilter, IoSearchSharp } from "react-icons/io5";
import { MdOutlineAddCircle } from "react-icons/md";
import Tabel from "../components/Fragements/Tabel";
import Link from "next/link";
import Header from "../components/Fragements/Header/Header";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../components/Fragements/Pagination/Pagination";

const HomePage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const search = searchParams.get("search") || "";
  const { data, refetch } = useFetchSale({ search, limit, page });

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_page); // Set total pages state from API response
    }
  }, [data]);

  console.log("data", data?.total_page);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
    refetch();
  }, 1000);

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      refetch();
    },
    [refetch]
  );

  return (
    <div>
      <div
        className={`w-full max-w-2xl md:max-w-full mx-auto z-50 
          bg-white shadow-lg rounded-xl border  border-gray-200 `}
      >
        <header className={` px-5 pt-4 flex flex-col `}>
          <Header title="Transaksi Penjualan" />
          <div className="flex justify-between items-center ">
            <SelectLimit
              selectedLimit={limit}
              onLimitChange={handleLimitChange}
            />
            <div className="flex gap-2 bg-red">
              <div className="relative rounded-full">
                <IoSearchSharp
                  size={20}
                  className="absolute fa fa-search text-gray-400 top-3 left-4"
                />
                <input
                  type="text"
                  className="bg-[#d9e2f6] h-10 px-12 rounded-full focus:outline-none hover:cursor-pointer"
                  name="search"
                  placeholder="Search..."
                  onChange={handleSearch}
                  defaultValue={search}
                />
              </div>
              <div className="text-gray-800 text-sm py-2 px-2 flex gap-1 items-center bg-[#d9e2f6] rounded-md hover:bg-[#b4c2f4] cursor-pointer">
                <IoFilter size={20} color="#2563EB" />
              </div>
              <Link
                href={"/add-product"}
                className="text-gray-800 text-sm py-2 px-2 flex gap-1 items-center bg-[#d9e2f6] rounded-md hover:bg-[#b4c2f4] cursor-pointer"
              >
                <MdOutlineAddCircle size={20} color="#2563EB" />
                <h1 className="text-[#2563EB] font-semibold">Add New</h1>
              </Link>
            </div>
          </div>
        </header>
        <div className="p-3 z-0">
          <div className="overflow-x-auto relative">
            <Tabel data={data?.data || []} />
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              page={page}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePage />
  </Suspense>
);

export default SuspenseWrapper;
