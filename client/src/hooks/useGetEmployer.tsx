import useAuthentication from "./useAuthentication";
import { useQuery } from "react-query";
import { getEmployerProfile } from "@/utils/actions/employers";

const useGetEmployer = () => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => getEmployerProfile(token as string),
    queryKey: ["profile"],
  });
};

export default useGetEmployer;
