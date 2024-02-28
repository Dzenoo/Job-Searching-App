type FiltersCheckboxesTypes = {
  id: string;
  title: string;
  value: string;
  type: string;
  count: number;
};

type FiltersContentProps = {
  id: string;
  title: string;
  checkboxes: FiltersCheckboxesTypes[];
};

export { type FiltersCheckboxesTypes, type FiltersContentProps };
