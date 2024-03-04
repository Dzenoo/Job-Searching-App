type FiltersCheckboxesTypes = {
  id: string;
  title: string;
  value: string;
  type: string;
  count: number;
};

type FiltersCheckboxesSectionTypes = {
  title: string;
  checkboxes: FiltersCheckboxesTypes[];
};

export { type FiltersCheckboxesTypes, type FiltersCheckboxesSectionTypes };
