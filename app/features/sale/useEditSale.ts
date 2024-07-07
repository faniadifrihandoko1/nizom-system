import { axiosInstance } from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess: () => void;
};

type Data = {
  data: any;
  id: number;
};

export const useEditSale = ({ onSuccess }: Props) => {
  return useMutation({
    mutationFn: async ({ data, id }: Data) => {
      const response = await axiosInstance.put(`/sale/${id}`, data);
      return response;
    },
    mutationKey: ["editSale"],
    onSuccess,
  });
};
