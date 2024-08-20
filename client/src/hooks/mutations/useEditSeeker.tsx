import { queryClient } from "@/contexts/react-query-client";
import { editSeekerProfile } from "@/lib/actions/seekers";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "../useAuthentication";

const useEditSeeker = () => {
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) =>
      editSeekerProfile(formData, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export default useEditSeeker;
