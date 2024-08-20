import useAuthentication from "./useAuthentication";
import { useQuery } from "react-query";
import { getEmployerProfile } from "@/utils/actions/employers";

const useGetEmployer = (type?: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => getEmployerProfile({ token: token as string, type: type }),
    queryKey: ["profile"],
  });
};

export default useGetEmployer;
