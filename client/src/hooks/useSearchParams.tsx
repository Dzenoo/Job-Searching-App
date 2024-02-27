import { useRouter } from "next/navigation";

type SearchParamsProps = {
  type: string;
  value: string;
};

const useSearchParams = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);

  function updateSearchParams({ type, value }: SearchParamsProps): void {
    searchParams.set(type, value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  }

  function deleteSearchParams({ type }: SearchParamsProps): void {
    searchParams.delete(type);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  }

  return { deleteSearchParams, updateSearchParams, searchParams };
};

export default useSearchParams;
