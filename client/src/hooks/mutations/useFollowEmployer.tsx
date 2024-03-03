import { followEmployer } from "@/utils/actions";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "../useAuthentication";

const useFollowEmployer = (employerId: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: () => followEmployer(employerId, token as string),
    mutationKey: ["companies"],
    onSuccess: (response: any) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useFollowEmployer;
