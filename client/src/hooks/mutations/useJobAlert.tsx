import { generateJobAlert } from "@/lib/actions/seekers.actions";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "../useAuthentication";
import { queryClient } from "@/context/react-query-client";

const useJobAlert = () => {
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) =>
      generateJobAlert(formData, token!),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["profile"]);
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error?.data?.response?.message);
    },
  });
};

export default useJobAlert;