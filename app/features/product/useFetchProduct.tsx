import { axiosInstance } from "@/app/lib/axios";
import { DataProduct } from "@/app/type/table";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  data: DataProduct[];
};
export const useFetchProduct = () => {
  return useQuery<DataProduct[], Error>({
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>("/product");
      return response.data.data;
    },
    queryKey: ["fetch.products"],
  });
};
