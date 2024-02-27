type FiltersCheckoxesTypes = {
  id: string;
  title: string;
  value: string;
  type: string;
  count: number;
};

type FiltersContentProps = {
  id: string;
  title: string;
  checkboxes: FiltersCheckoxesTypes[];
};

export { type FiltersCheckoxesTypes, type FiltersContentProps };
