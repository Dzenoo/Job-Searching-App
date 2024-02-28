import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

enum SearchParamsActions {
  add = "add",
  remove = "remove",
}

type SearchParamsFilters = {
  [key: string]: string[];
};

type UseSearchParams = {
  performanceSearchParams: (...args: any[]) => void;
  searchParams: URLSearchParams;
  filters: SearchParamsFilters;
  updateSearchParams: (
    param: string,
    value: string,
    action: keyof typeof SearchParamsActions
  ) => void;
};

const useSearchParams = (): UseSearchParams => {
  const [filters, setFilters] = useState<SearchParamsFilters>({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj: SearchParamsFilters = {};

    searchParams.forEach((value, key) => {
      paramsObj[key] = paramsObj[key] ? [...paramsObj[key], value] : [value];
    });

    setFilters(paramsObj);
  }, [router]);

  const updateSearchParams = React.useCallback(
    (
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

      if (["query", "page", "sort"].includes(param)) {
        searchParams.set(param, value);
        if (value === "") {
          searchParams.delete(param);
        }
      }

      const newPath = `${pathname}?${searchParams.toString()}`;
      router.push(newPath, { scroll: false });

      setFilters((prev) => ({ ...prev, [param]: values }));
    },
    []
  );

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceUpdateSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return {
    performanceSearchParams: debounceUpdateSearchParams,
    filters,
    searchParams,
    updateSearchParams,
  };
};

export default useSearchParams;
