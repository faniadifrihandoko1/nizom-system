import { axiosInstance } from "@/app/lib/axios";
import { DataTables } from "@/app/type/table";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  data: DataTables;
};
export const useFetchSaleById = (id: number) => {
  return useQuery<DataTables, Error>({
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>(`/sale/${id}`);
      return response.data.data;
    },
    queryKey: ["fetch.saleById"],
  });
};
