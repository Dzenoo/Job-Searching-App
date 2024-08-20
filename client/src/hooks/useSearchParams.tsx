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
  searchParams: URLSearchParams;
  checkboxSearchParams: (
    param: string,
    value: string,
    action: keyof typeof SearchParamsActions
  ) => void;
  updateSearchParams: (param: string, value: string) => void;
  filters: SearchParamsFilters;
  debounce: (func: Function, delay: number) => (...args: any[]) => void;
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

  const checkboxSearchParams = React.useCallback(
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

      const newPath = `${pathname}?${searchParams.toString()}`;
      router.push(newPath, { scroll: false });

      setFilters((prev) => ({ ...prev, [param]: values }));
    },
    []
  );

  const updateSearchParams = (param: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(param, value);

    if (value === "") {
      searchParams.delete(param);
    }

    const newPath = `${pathname}?${searchParams.toString()}`;
    router.push(newPath, { scroll: false });
  };

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return {
    filters,
    checkboxSearchParams,
    searchParams,
    updateSearchParams,
    debounce,
  };
};

export default useSearchParams;
