import { getSeekerProfile } from "@/lib/actions/seekers";
import { useQuery } from "react-query";
import useAuthentication from "./useAuthentication";

const useGetSeeker = () => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => getSeekerProfile(token as string),
    queryKey: ["profile"],
  });
};

export default useGetSeeker;
