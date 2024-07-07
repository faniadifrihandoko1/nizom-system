import { axiosInstance } from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";
type Props = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
};
export const useDeleteSale = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/sale/${id}`);
      console.log("response mutate delete", response);
      return response;
    },
    mutationKey: ["deleteSale"],
    onSuccess,
    onError,
  });
};
