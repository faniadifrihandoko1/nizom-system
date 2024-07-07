import { axiosInstance } from "@/app/lib/axios";
import { DataTables } from "@/app/type/table";
import { useQuery } from "@tanstack/react-query";

type Props = {
  search?: string;
  limit?: number;
  offset?: number;
  page?: number;
  sort?: string;
  order?: string;
};

type ApiResponse = {
  data: DataTables[];
  total_page: number;
};

export const useFetchSale = ({
  search,
  limit,
  offset,
  page,
  sort,
  order,
}: Props) => {
  return useQuery<ApiResponse>({
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (limit) params.append("limit", limit.toString());
      if (offset) params.append("offset", offset.toString());
      if (page) params.append("page", page.toString());
      if (sort) params.append("sort", sort);
      if (order) params.append("order", order);

      const response = await axiosInstance.get<ApiResponse>(
        `/sale?${params.toString()}`
      );
      // setTotalPages(response.data.totalPages);
      console.log("response", response.data.data);
      return response.data;
    },
    queryKey: ["fetch.sale", search, limit, offset, page, sort, order],
  });
};
