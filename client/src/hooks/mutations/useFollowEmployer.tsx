import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "../useAuthentication";
import { queryClient } from "@/contexts/react-query-client";
import { followEmployer } from "@/utils/actions/seekers";

const useFollowEmployer = (employerId: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: () => followEmployer(employerId, token as string),
    mutationKey: ["company"],
    onSuccess: (response: any) => {
      queryClient.invalidateQueries("company");
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useFollowEmployer;
