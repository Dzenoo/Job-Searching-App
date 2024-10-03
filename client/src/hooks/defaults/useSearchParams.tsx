"use client";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
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
  const nextSearchParams = useNextSearchParams();

  useEffect(() => {
    const paramsObj: SearchParamsFilters = {};

    nextSearchParams.forEach((value, key) => {
      paramsObj[key] = paramsObj[key] ? [...paramsObj[key], value] : [value];
    });

    setFilters(paramsObj);
  }, [nextSearchParams]);

  const checkboxSearchParams = React.useCallback(
    (
      param: string,
      value: string,
      action: keyof typeof SearchParamsActions
    ) => {
      const updatedSearchParams = new URLSearchParams(
        nextSearchParams.toString()
      );
      let values = updatedSearchParams.getAll(param);

      if (action === "add") {
        if (!values.includes(value)) {
          values.push(value);
        }
      } else if (action === "remove") {
        values = values.filter((v) => v !== value);
      }

      updatedSearchParams.delete(param);
      values.forEach((v) => updatedSearchParams.append(param, v));

      const newPath = `${pathname}?${updatedSearchParams.toString()}`;
      router.push(newPath, { scroll: false });

      setFilters((prev) => ({ ...prev, [param]: values }));
    },
    [nextSearchParams, pathname, router]
  );

  const updateSearchParams = (param: string, value: string) => {
    const updatedSearchParams = new URLSearchParams(
      nextSearchParams.toString()
    );

    updatedSearchParams.set(param, value);

    if (value === "") {
      updatedSearchParams.delete(param);
    }

    const newPath = `${pathname}?${updatedSearchParams.toString()}`;
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
    searchParams: nextSearchParams,
    updateSearchParams,
    debounce,
  };
};

export default useSearchParams;
