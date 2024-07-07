import { axiosInstance } from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess: () => void;
};

export const useCreateSale = ({ onSuccess }: Props) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/sale", data);
      console.log("response mutate", response);
      return response;
    },
    mutationKey: ["createSale"],
    onSuccess,
  });
};
