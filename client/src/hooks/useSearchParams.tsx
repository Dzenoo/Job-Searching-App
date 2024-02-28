import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum SearchParamsActions {
  add = "add",
  remove = "remove",
}

type SearchParamsFilters = {
  [key: string]: string[];
};

type UseSearchParams = {
  filters: SearchParamsFilters;
  updateSearchParams: (
    param: string,
    value: string,
    action: keyof typeof SearchParamsActions
  ) => void;
};

const useSearchParams = (): UseSearchParams => {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<SearchParamsFilters>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj: SearchParamsFilters = {};
    searchParams.forEach((value, key) => {
      if (paramsObj[key]) {
        paramsObj[key].push(value);
      } else {
        paramsObj[key] = [value];
      }
    });
    setFilters(paramsObj);
  }, [pathname]);

  const updateSearchParams = (
    param: string,
    value: string,
    action: keyof typeof SearchParamsActions
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    let values = searchParams.getAll(param);
    if (action === "add") {
      if (!values.includes(value)) {
        values.push(value);
      }
    } else if (action === "remove") {
      values = values.filter((v) => v !== value);
    }
    searchParams.delete(param);
    values.forEach((v) => searchParams.append(param, v));
    const newPath = `${pathname}?${searchParams.toString()}`;
    router.push(newPath);
    setFilters((prev) => ({ ...prev, [param]: values }));
  };

  return { filters, updateSearchParams };
};

export default useSearchParams;
