import { axiosInstance } from "@/app/lib/axios";
import { DataTables } from "@/app/type/table";
import { useQuery } from "@tanstack/react-query";

type Props = {};

type ApiResponse = {
  data: DataTables[];
};

export const useFetchSale = ({}: Props) => {
  return useQuery<DataTables[]>({
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>(`/sale`);
      console.log("response", response.data.data);
      return response.data.data;
    },
    queryKey: ["fetch.saleAll"],
  });
};
