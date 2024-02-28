import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const useSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<any>({});
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj: any = {};
    searchParams.forEach((value, key) => {
      if (paramsObj[key]) {
        paramsObj[key] = [...paramsObj[key], value];
      } else {
        paramsObj[key] = [value];
      }
    });
    setFilters(paramsObj);
  }, [pathname]);
  const updateURL = (updatedFilters: any) => {
    const searchParams = new URLSearchParams();
    Object.keys(updatedFilters).forEach((key) => {
      updatedFilters[key].forEach((value: any) => {
        searchParams.append(key, value);
      });
    });
    const newPathname = `${pathname}?${searchParams.toString()}`;
    router.push(newPathname, undefined);
  };
  return { filters, setFilters, updateURL };
};

export default useSearchParams;
